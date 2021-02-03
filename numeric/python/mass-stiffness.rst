Matrices de Masse et de Rigidité
================================

Rappel : Algorithme d'assemblage
--------------------------------

Plutôt que de calculer les coefficients un à un de la matrice :math:`A`, l'algorithme d'assemblage propose de parcours chaque élément et d'ajouter leur contribution élémentaire à la grande matrice. Avec notre notation en :code:`Triplets` cela donne :

.. code-block:: bash

  Triplets t;
  For p = 1, ... Nt  // Parcours des Triangles
    Mp = MatElem(p); // Matrice Elementaire du triangle p
    For i = 1,2,3
      I = Loc2Glob(p, i);
      For j = 1,2,3
        J = Loc2Glob(p,j);
        t.append(I, J, Mp(i,j)); // contribution élémentaire
      End
  End


Si les élements parcourus sont ne sont pas des triangles à 3 points (segments, tétrahèdres, ...), il suffit d'adapter le pseudo-code ci-desssus. Nous devons donc implémenter les calculs des matrices de masse et de rigidité élémentaire pour chaque élément.

Matrices de masse élémentaires
------------------------------

Construisez une fonction :code:`mass_elem` prenant en argument un :code:`Segment` ou un :code:`Triangle`, un :code:`Triplets` et un scalaire optionnel :

.. code-block:: python

  # element = Segment ou Triangle ; triplets = Triplets ; alpha un scalaire optionnel
  def mass_elem(element, triplets, alpha =1.):
      # ...
      # return triplets


Cette fonction calcule [les coefficients de la matrice élémentaire](http://bthierry.pages.math.cnrs.fr/course/fem/implementation_matrices_elementaires/) de l'élément (selon son type) et les ajoute à :code:`triplets`.

.. proof:remark::

  Pour un élément donné, son type (:code:`Segment` ou :code:`Triangle`) est donné par son paramètre :code:`name`. 


## Matrice de masse globale

Nous proposons de construire une fonction qui calcule toutes les contributions élémentaires de la matrice de masse d'un domaine de tag :code:`Physical` et de dimension :code:`dim` issue d'un maillage :code:`msh`. Les coefficients partiels seront ajoutés sous forme de :code:`Triplet` dans une liste envoyée en argument. Nous séparons pour le moment les calculs de la matrice de masse de ceux de la matrice de rigidité :

.. code-block:: python

  # msh = Mesh, dim = int, physical_tag = int, triplets = Triplets
  def Mass(msh, dim, physical_tag, triplets):
      #...


.. proof:exercise::
  
  Au boulot ! Assurez vous que la matrice de masse globale :math:`M` associée au domaine :math:`\Omega` vérifie la relation suivante

  .. math:: U^T M.U = |\Omega|, \qquad U = [1, 1, 1, \ldots, 1]^T.


Matrice de Rigidité
-------------------

Pour les matrices de rigidité, il faut calculer des quantités supplémentaires, comme la matrice :math:`B\_p` ou les gradients des fonctions de forme, par exemple :

.. code-block:: python

  def gradPhi(element, i:int):
      # ...

.. proof:exercise::

  Ajoutez les fonctionnalités dans votre code permettant de calculer les contributions élémentaires des matrices de rigidité puis la matrice globale. 

  Vérifiez que votre matrice de rigidité :math:`D` satisfait bien la relation suivante :
  
  .. math::   D U = 0, \qquad U = [1, 1, 1, \ldots, 1]^T.


