Assemblage des Matrices
=======================


Nous devons maintenant calculer effectivement les coefficients :math:`\Ahh[I][J]` de la matrice :math:`A` et :math:`\Bh[I]` du vecteur :math:`B`. Nous nous intéressons pour l'instant uniquement à la matrice :math:`A`.


Algorithme "brut-force"
--------------------------

Prenons deux indices de sommets :math:`I` et :math:`J` et rappelons la valeur du coefficient :math:`\Ahh[I][J]` :

.. math::

  \Ahh[I][J] = a(\mphi[J], \mphi[I]) = \int_{\Omega}\nabla \mphi[J] \cdot\nabla \mphi[I]+ c\int_{\Omega}\mphi[J]\mphi[I]

Chaque intégrale sur :math:`\Omega` peut être décomposée comme une somme sur les triangles :math:`\tri[p]` :

.. math::

  \begin{aligned}
    \Ahh[I][J] &= \sum_{p=0}^{\Nt-1} \int_{\tri[p]}\nabla \mphi[J] \cdot\nabla \mphi[I]+ c\sum_{p=0}^{\Nt-1} \int_{\tri[p]}\mphi[J]\mphi[I]\\
    \Bh[I] &= \sum_{p=0}^{\Nt-1}\int_{\tri[p]}f(x)\mphi[I](x)\diff x.
  \end{aligned}

Pour deux sommets :math:`\vertice[I]` et :math:`\vertice[J]` n'appartenant pas un même triangle, alors :math:`\supp(\mphi[I])\cap\supp(\mphi[J]) =\emptyset` et donc le coefficient :math:`\Ahh[I][J]` est nul ! En moyenne de manière empirique, un nœud (ou sommet) est connecté au maximum à 6 à 8 autres nœuds (en 2D). Une conséquence directe est que \alert{la matrice :math:`\Ahh` est creuse}, c'est-à-dire qu'un nombre important de ses coefficients sont nuls. Une stratégie de stockage creux est donc à utiliser, ce que nous verrons plus loin.% (souvent `COO <https://en.wikipedia.org/wiki/Sparse_matrix#Coordinate_list_(COO)>`_ puis `CSR <https://en.wikipedia.org/wiki/Sparse_matrix#Compressed_sparse_row_(CSR,_CRS_or_Yale_format))>`_)



Nous devons bien entendu construire cette matrice : calculer chacun de ses coefficients et les stocker. Un algorithme naïf ou brut-force (mais naturel)pour calculer chaque coefficient est de boucler sur les sommets et et de remplir la matrice au fur et à mesure, c’est-à-dire de remplir les coefficients les uns après les autres. Il est présenté dans l'Algorithm \ref{algo:naif}. 

Il est à noter que la boucle sur les triangles pourraient être simplifiée en ne bouclant que sur les triangles ayant pour sommet :math:`\vertice[I]` et :math:`\vertice[J]`. Cependant, cet algorithme a tout de même un coût en :math:`\grandO{\Ns^2}` ce qui est trop important pour être utilisable en pratique. 

.. code-block:: bash

  For I = 0:N_s-1}
    For J = 0:N_s-1}
      A(I,J) = 0
      For p = 0:N_t-1
        A(I,J) += \int_{K_p}\nabla \mphi[J](\xx) \cdot\nabla \mphi[I](\xx)\diff \xx +\int_{\tri[p]}\mphi[J](\xx)\mphi[I](\xx)\diff \xx
      EndFor
    EndFor
    B(I) = 0
    For p = 0:N_t-1
      B[I] += \int_{\tri[p]}f(\xx) \mphi[I](\xx)\diff \xx
    EndFor
  EndFor


Algorithme d'assemblage
-----------------------

Une autre manière de procéder, que l'on appelle \alert{assemblage}, se base sur une boucle sur les triangles plutôt que sur les sommets. Le principe est de parcourir les triangles et de calculer des \alert{contributions élémentaires}, qui vont s'ajouter petit à petit dans la matrice :math:`\Ahh`. Reprenons l'expression du coefficient :math:`\Ahh[I][J]`:

.. math::

  \Ahh[I][J] = \sum_{p=0}^{\Nt-1} \underbrace{\int_{\tri[p]}\nabla \mphi[J] \cdot\nabla \mphi[I]}_{\text{Contrib. élémentaire}}+ c\sum_{p=0}^{\Nt-1} \underbrace{\int_{\tri[p]}\mphi[J]\mphi[I]}_{\text{Contrib. élémentaire}}

Introduisons :math:`a_p(\cdot,\cdot)` la famille de forme bilinéaire suivante, pour :math:`p=0,\ldots,\Nt-1` : 

.. math::

  a_p(\mphi[J],\mphi[I]) = \int_{\tri[p]}\nabla \mphi[J](\xx) \cdot\nabla \mphi[I](\xx)\diff \xx +c\int_{\tri[p]}\mphi[J](\xx)\mphi[I](\xx)\diff \xx

Ensuite, nous réécrivons la matrice :math:`\Ahh` sous la forme suivante

.. math::

  \Ahh = \sum_{I=0}^{\Ns-1}\sum_{j=0}^{\Ns-1}a(\mphi[J],\mphi[I]) \ee_I^T\ee_J,

où :math:`\ee_I` est le vecteur de la base canonique de :math:`\Rb^{\Ns}`.  Nous avons alors

.. math::

  \begin{aligned}
    A &= \sum_{I=0}^{\Ns-1}\sum_{J=0}^{\Ns-1}a(\mphi[J],\mphi[I]) \ee_I^T\ee_J\\
     &=  \sum_{I=0}^{\Ns-1}\sum_{J=0}^{\Ns-1}\sum_{p=0}^{\Nt-1}a_{p}(\mphi[J],\mphi[I]) \ee_I^T\ee_J\\
     &=  \sum_{p=0}^{\Nt-1}\sum_{I=0}^{\Ns-1}\sum_{J=0}^{\Ns-1}a_{p}(\mphi[J],\mphi[I]) \ee_I^T\ee_J\\
  \end{aligned}
  :label:eq-assemble_tmp

Nous remarquons maintenant que :math:`a_{p}(\mphi[J],\mphi[I])` est nul dès lors que :math:`\vertice[I]` ou :math:`\vertice[J]` ne sont pas des sommets de :math:`\tri[p]`. Finalement, la somme sur tous les sommets du maillage se réduit alors une somme sur les 3 sommets du triangle :math:`\tri[p]` considéré. 

Nous comprenons que nous devons maintenant travailler localement dans chaque triangle. Pour cela, nous avons besoin d'introduire une \alert{numérotation locale} de chaque sommet une fonction :math:`\locToGlob` permettant de basculer du local vers le global une fonction telle que, pour :math:`p=0,\ldots,\Nt-1` et :math:`i=0,1,2` : 

.. math::

    \locToGlob[p][i] = I \iff \vertice[i][p] = \vertice[I]

Ainsi, pour un triangle  :math:`\tri[p]`, ses sommets sont numérotés :math:`[\vertice[0][p],\vertice[1][p],\vertice[2][p]]` en numérotation locale ou :math:`[\vertice[\locToGlob[0][p]],\vertice[\locToGlob[1][p]],\vertice[\locToGlob[2][p]]]` en numérotation globale, comme le montre la figure \ref{fig:locglob}. Nous distinguerons la numérotation globale par des lettres capitales (:math:`I`, :math:`J`) et la numérotation locale par des minuscules (:math:`i`,:math:`j`). Nous introduisons aussi les fonctions de forme locales :

.. math::

  \mphi[i][p] = \mphi[\locToGlob[p][i]]|_{\tri[p]}.


\begin{figure}
  \def\svgwidth{0.9\textwidth}
  \centering\import{img/}{loc2glob.pdf_tex}  
  \caption{Numérotation locale et globale}
\end{figure}

Utilisons ces nouvelles notations dans l'équation \ref{eq:assemble_tmp}, en ramenant la somme sur les sommets à uniquement les sommets du triangle considéré :

.. math::

  A = \sum_{p=0}^{\Nt-1}\sum_{i=0}^{2}\sum_{j=0}^{2}a_{p}(\mphi[j][p],\mphi[i][p]) \ee_{\locToGlob[i][p]}^T\ee_{\locToGlob[j][p]}

L'algorithme d'assemblage est alors complet ! Une version pseudo-code est présenté par l'Algorithme \ref{algo:assemblage}. Sa complexité est en :math:`\grandO{\Nt} \ll \grandO{\Ns^2}`. Comme le premier algorithme \ref{algo:naif}, il possède en plus l'avantage d'être parallélisable.

.. code-block:: bash

  A = 0
  B = 0
  For p = 0:N_t-1
    For i = 0:2
      I = locToGlob(p,i)
      For j = 0:2
        J = locToGlob(p,j)
        A(I,J) += a_p(\mphi[j][p],\mphi[i][p])
      EndFor
      B(I) += l_p(\mphi[i][p])
    EndFor
  EndFor
  \end{algorithmic}


.. proof:remark::

  Pour mieux comprendre la différence entre numérotation locale et globale, une application est disponible en ligne :
  https://bthierry.pages.math.cnrs.fr/course/fem/implementation_maillage/


.. proof:remark::
  
  Cet algorithme n'est pas encore utilisable, nous devons calculer la valeur de :math:`a_p(\mphi[j][p],\mphi[i][p])` et :math:`\ell_p(\mphi[i][p])`. De plus, il manque encore les conditions de Dirichlet.




