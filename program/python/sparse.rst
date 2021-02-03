Matrices Creuses
================

Le but maintenant est d'implémenter la méthode des éléments finis P1 en 2D, autrement dit, à un maillage donné, de calculer :

- Les matrices de masse 2D (union de triangles) et 1D (union de segments)
- Les matrices de rigité (union de triangles) et 1D (union de segments)
- Appliquer les conditions de Dirichlet éventuelles
- Approcher des intégrales par des quadratures adaptées

La matrice du système finale sera stockée sous le format COOrdinate. L'algorithme d'assemblage se prête particulièrement bien au stockage COO puisque la redondance des coefficients est autorisée par Scipy. Autrement dit, les fonctions calculant les matrices de masse et de rigidité retourneront des triplets de type :code:`[I, J, Valeur]` où :code:`I` est l'indice ligne, :code:`J` l'indice colonne et :code:`Valeur` le coefficient (potentiellement partiel).

Avant de résoudre le système, la matrice sera transformée au format Compressed Storage Raw (CSR).

Matrice COO
-----------

Rappels
+++++++

Le format COO (*COOrdinates*) propose de ne stocker que les coefficients non nuls d'une matrice :code:`A` sous la forme de 2 listes d'entiers :code:`row` et :code:`col` et une liste de réels :code:`val`, toutes trois de même taille, telles que

.. code-block:: python

  A[row[i], col[i]] = val[i]


Les trois listes peuvent aussi être combinées en une seule liste :code:`data` de triplets de type :code:`[int, int, double]` et telle que :

.. code-block:: python

  data[i] = [row[i], col[i], val[i]]


Le format COO est assez permissif :

- Redondance : si deux triplets possèdent les mêmes indices ligne et colonne alors le coefficient de la matrice, associé à ces indices ligne et colonne, sera obtenu en sommant les valeurs de ces triplets.
- Pas d'ordre : aucune nécessité d'ordonner les triplets selon les lignes ou les colonnes

Par exemple, les deux jeux de listes ci-dessous décrivent la même maitrce, la seule différence est que le coefficient en (2,2) est scindé en deux et le premier et le dernier triplet ont été permutés :

+------------------+-----+-----+-----+-----+-----+-----+-----+
| :code:`i`        | 0   | 1   | 2   | 3   | 4   | 5   | 6   |
+==================+=====+=====+=====+=====+=====+=====+=====+
| :code:`row[i]`   | 0   | 0   | 1   | 2   | 3   | 3   | 3   |
+------------------+-----+-----+-----+-----+-----+-----+-----+
| :code:`col[i]`   | 0   | 3   | 1   | 2   | 0   | 1   | 3   |
+------------------+-----+-----+-----+-----+-----+-----+-----+
| :code:`val[i]`   | 1.1 | 2   | 1   | 2.3 | 0.5 | 2   | 2   |
+------------------+-----+-----+-----+-----+-----+-----+-----+

+------------------+-----+-----+-----+---------+-------+-----+-----+-------+
| :code:`i`        | 0   | 1   | 2   | 3       | 4     | 5   | 6   | 7     |
+==================+=====+=====+=====+=========+=======+=====+=====+=======+
| :code:`row[i]`   | 3   | 0   | 1   | **2**   | **2** | 3   | 3   | 0     |
+------------------+-----+-----+-----+---------+-------+-----+-----+-------+
| :code:`col[i]`   | 3   | 3   | 1   | **2**   | **2** | 0   | 1   | 0     |
+------------------+-----+-----+-----+---------+-------+-----+-----+-------+
| :code:`val[i]`   | 2   | 2   | 1   | **1.3** | **1** | 0.5 | 2   | 1.1   |
+------------------+-----+-----+-----+---------+-------+-----+-----+-------+

Scipy
+++++

Pour construire une `matrice COO dans Scipy <https://docs.scipy.org/doc/scipy/reference/generated/scipy.sparse.coo_matrix.html>`_ à partir d'un jeu de données :code:`data`, ce dernier doit être de type :code:`([], ([],[]))` : un :code:`Tuple` contenant une :code:`List` (:code:`val`) ainsi qu'un :code:`Tuple` contenant deux :code:`List` (:code:`row` et :code:`col`) (`list vs. tuple ? <https://stackoverflow.com/questions/626759/whats-the-difference-between-lists-and-tuples>`_) :

.. code-block:: python

  data = (val, (row, col))

Une matrice COO se construit alors ainsi

.. code-block:: python

  A = coo_matrix(data)              # si data dans le format ci-dessus
  A = coo_matrix((val, (row, col))) # si row, col et val sont séparées

.. proof:remark::

  Une matrice COO peut être visualisée en se transformant en :code:`array` `avec la méthode toarray() <https://docs.scipy.org/doc/scipy/reference/generated/scipy.sparse.coo_matrix.html>`_ :

  .. code-block:: python

    print(A.toarray())

Triplets
++++++++

Nous proposons de construire notre future matrice par concaténation de triplets de type (I, J, valeur). une classe :code:`Triplets` qui encapsule cette structure de données. Nous lui adjoignons une méthode :code:`append` permettant d'ajouter un triplet au bout des autres :

.. code-block:: python

  Triplets t;           print(t.data) # ([], ([], []))
  t.append(0, 1 ,2.);  print(t.data) # ([2.], ([0], [1]))
  t.append(3, 4 ,5.2); print(t.data) # ([2., 5.2], ([0, 3], [1, 4]))


La classe ressemble alors à cela:

.. code-block:: python

  def class Triplet:
    def __init__():
      self.data = ([], ([], []))
    def __str__():
      return str(self.data)
    def append(self, I, J, val):
      # Ajoute le triplet [I, J, val] dans self.data
      # ...


.. proof:exercise::

  Construisez la classe :code:`Triplet` et implémentez la méthode :code:`append`. N'oubliez pas de tester votre classe.


.. proof:exercise::

  Testez votre classe :code:`Triplet` en construisant la matrice suivante (au format COO évidemment) :


.. math::

  A = \begin{pmatrix}
  1.1 & 0 & 0 & 2 \\
  0 & 1 & 0 & 0  \\
  0 & 0 & 2.3 & 0 \\
  0.5 & 2 & 0 & 2
  \end{pmatrix}


.. {{< diagram>}}
  classDiagram
        class Triplets{
          +(float[ ], (int[ ], int[ ])) data
            __init__(self)
            append(self, i, j, val)
        }
  {{< /diagram>}}

Format CSR
----------

Une fois la matrice au format COO construite, nous la transformerons au format CSR par `la méthode tocsr() <https://docs.scipy.org/doc/scipy/reference/generated/scipy.sparse.coo_matrix.tocsr.html#scipy.sparse.coo_matrix.tocsr>`_ :

.. code-block:: python

  A = coo_matrix((val, (row, col))).tocsr()
