Assemblage des Matrices
=======================


Nous devons maintenant calculer effectivement les coefficients :math:`A_{I,J}` de la matrice :math:`A` et :math:`\Bh_{I}` du vecteur :math:`B`. Nous nous intéressons pour l'instant uniquement à la matrice :math:`A`.


Algorithme "brut-force"
--------------------------

Prenons deux indices de sommets :math:`I` et :math:`J` et rappelons la valeur du coefficient :math:`A_{I,J}` :

.. math::

  A_{I,J} = a(\mphi_J, \mphi_I) = \int_{\Omega}\nabla \mphi_J \cdot\nabla \mphi_I+ c\int_{\Omega}\mphi_J\mphi_I

Chaque intégrale sur :math:`\Omega` peut être décomposée comme une somme sur les triangles :math:`\tri_p` :

.. math::

  \begin{aligned}
    A_{I,J} &= \sum_{p=0}^{\Nt-1} \int_{\tri_p}\nabla \mphi_J \cdot\nabla \mphi_I+ c\sum_{p=0}^{\Nt-1} \int_{\tri_p}\mphi_J\mphi_I\\
    \Bh_{I} &= \sum_{p=0}^{\Nt-1}\int_{\tri_p}f(x)\mphi_I(x)\diff x.
  \end{aligned}

Soit deux sommets :math:`\vertice_I` et :math:`\vertice_J` n'appartenant pas un même triangle, alors :math:`\supp(\mphi_I)\cap\supp(\mphi_J) =\emptyset`. Autrement dit, :math:`\mphi_I\mphi_J` est toujours nul et donc le coefficient :math:`A_{I,J}` est nul ! Vue autrement, si deux sommets :math:`\vertice_I` et :math:`\vertice_J` ne sont pas connectés par une arête, alors :math:`A_{I,J=0}`.

Les coefficients de :math:`A` sont donc majoritairement nuls car deux sommets pris au hasard (dans le million d'un maillage) ne sont pas connectés. En moyenne de manière empirique, un nœud (ou sommet) est connecté au maximum à 6 à 8 autres nœuds (en 2D). Une conséquence directe est que **la matrice** :math:`A` **est creuse**, c'est-à-dire qu'un nombre important de ses coefficients sont nuls. Une stratégie de stockage creux est donc à utiliser, ce que nous verrons plus loin. Une manière pratique est d'utiliser le format `COO <https://en.wikipedia.org/wiki/Sparse_matrix#Coordinate_list_(COO)>`_ pour l'assemblage puis le format `CSR <https://en.wikipedia.org/wiki/Sparse_matrix#Compressed_sparse_row_(CSR,_CRS_or_Yale_format))>`_ pour l'algèbre linéaire et la résolution du système.



Nous devons bien entendu construire cette matrice : calculer chacun de ses coefficients et les stocker. Un algorithme naïf ou brut-force (mais naturel) pour calculer chaque coefficient est de boucler sur les sommets et et de remplir la matrice au fur et à mesure, c’est-à-dire de remplir les coefficients les uns après les autres. Il est présenté dans :ref:`l'algorithme brut-force <algo-brut-force>`. 

Il est à noter que la boucle sur les triangles pourraient être simplifiée en ne bouclant que sur les triangles ayant pour sommet :math:`\vertice_I` et :math:`\vertice_J`. Cependant, cet algorithme a tout de même un coût en :math:`\grandO{\Ns^2}` ce qui est trop important pour être utilisable en pratique. 

.. _algo-brut-force: 

.. code-block:: bash
  :caption: Algorithme brut-force

  For I = 0:N_s-1
    For J = 0:N_s-1
      A(I,J) = 0
      For p = 0:N_t-1
        A(I,J) += ∫_{K_p} (∇ ϕ_J·∇ ϕ_I) +∫_{K_p}(ϕ_J ϕ_I)
      EndFor
    EndFor
    B(I) = 0
    For p = 0:N_t-1
      B[I] += ∫_{K_p} (f ϕ_I)
    EndFor
  EndFor


Algorithme d'assemblage
-----------------------

Une autre manière de procéder, que l'on appelle **assemblage**, se base sur une boucle sur les triangles plutôt que sur les sommets. Le principe est de parcourir les triangles et de calculer des **contributions élémentaires**, qui vont s'ajouter petit à petit dans la matrice :math:`A`. Reprenons l'expression du coefficient :math:`A_{I,J}`:

.. math::

  A_{I,J} = \sum_{p=0}^{\Nt-1} \underbrace{\int_{\tri_p}\nabla \mphi_J \cdot\nabla \mphi_I}_{\text{Contrib. élémentaire}}+ c\sum_{p=0}^{\Nt-1} \underbrace{\int_{\tri_p}\mphi_J\mphi_I}_{\text{Contrib. élémentaire}}

Introduisons :math:`a_p(\cdot,\cdot)` la famille de forme bilinéaire suivante, pour :math:`p=0,\ldots,\Nt-1` : 

.. math::

  a_p(\mphi_J,\mphi_I) = \int_{\tri_p}\nabla \mphi_J(\xx) \cdot\nabla \mphi_I(\xx)\diff \xx +c\int_{\tri_p}\mphi_J(\xx)\mphi_I(\xx)\diff \xx

Ensuite, nous réécrivons la matrice :math:`A` sous la forme suivante

.. math::

  A = \sum_{I=0}^{\Ns-1}\sum_{j=0}^{\Ns-1}a(\mphi_J,\mphi_I) \ee_I^T\ee_J,

où :math:`\ee_I` est le vecteur de la base canonique de :math:`\Rb^{\Ns}`.  Nous avons alors

.. math:: 
  :label: eq-assemble_tmp

  \begin{aligned}
    A &= \sum_{I=0}^{\Ns-1}\sum_{J=0}^{\Ns-1}a(\mphi_J,\mphi_I) \ee_I^T\ee_J\\
     &=  \sum_{I=0}^{\Ns-1}\sum_{J=0}^{\Ns-1}\sum_{p=0}^{\Nt-1}a_{p}(\mphi_J,\mphi_I) \ee_I^T\ee_J\\
     &=  \sum_{p=0}^{\Nt-1}\sum_{I=0}^{\Ns-1}\sum_{J=0}^{\Ns-1}a_{p}(\mphi_J,\mphi_I) \ee_I^T\ee_J\\
  \end{aligned}

Nous remarquons maintenant que :math:`a_{p}(\mphi_J,\mphi_I)` est nul dès lors que :math:`\vertice_I` ou :math:`\vertice_J` ne sont pas des sommets de :math:`\tri_p` (car :math:`\mphi_I\mphi_J = 0` sur :math:`\tri_p`). Finalement, la somme sur tous les sommets du maillage se réduit à une somme sur les 3 sommets du triangle :math:`\tri_p` considéré. 

Nous comprenons que nous devons maintenant travailler **localement** dans chaque triangle. Pour cela, nous avons besoin d'introduire une **numérotation locale** de chaque sommet une fonction :math:`\locToGlob` (*Local To Global*)permettant de basculer du local vers le global une fonction telle que, pour :math:`p=0,\ldots,\Nt-1` et :math:`i=0,1,2` : 

.. math:: \locToGlob(p,i) = I \iff \vertice_i^p = \vertice_I

Ainsi, pour un triangle  :math:`\tri_p`, ses sommets sont numérotés :math:`[\vertice_{0}^{p},\vertice_{1}^{p},\vertice_{2}^{p}]` en numérotation locale ou :math:`[\vertice_{\locToGlob(p,0)},\vertice_{\locToGlob(p,1)},\vertice_{\locToGlob(p,2)}]` en numérotation globale, comme le montre la figure :numref:`{number} <fig-loc2glob>`. Nous distinguerons la numérotation globale par des lettres capitales (:math:`I`, :math:`J`) et la numérotation locale par des minuscules (:math:`i`, :math:`j`). Nous introduisons aussi les fonctions de forme locales :

.. math:: \mphi_i^p = \mphi_{\locToGlob(p,i)}|_{\tri_p}.


.. proof:remark::

  Pour mieux comprendre la différence entre numérotation locale et globale, une application est disponible en ligne :
  https://bthierry.pages.math.cnrs.fr/course-fem/lecture/mise-en-oeuvre/assemblage/#app-local-to-global. 
  
  Une autre `application web <../_static/pecheux/matrix-assembly/index.html>`_, développée cette fois-ci par `Mina Pêcheux <http://minapecheux.com>`_,  présente l'assemblage pas à pas d'une matrice. En cliquant sur un triangle, les contributions de ce dernier seront ajoutées dans la grande matrice de masse. La matrice de masse élémentaire associée au triangle est également affichée.



.. _fig-loc2glob:

.. figure:: /img/loc2glob/loc2glob.*
  :figwidth: 100%
  :width: 100%
  :alt: Numérotation locale et globale
  :align: center

  Numérotation locale et globale

.. raw:: html

  <div id="app-local-to-global" class="iframe-container" style=" overflow: hidden;padding-top: 100%;position: relative;"><iframe src='../../../_static/app/loc2glob/index.html' frameborder="0" scrolling="no" style="border: 0;height: 100%;left: 0;position: absolute;top: 0;width: 100%;"></iframe></div>
  <div  style="text-align:center;">
    <p><strong>Application interactive : Cliquez sur un triangle</strong> pour faire apparaitre la <strong>numérotation locale</strong> des sommets du triangle. Recliquez dessus pour revenir en <strong>numérotation globale</strong></p> 
  </div>

Utilisons ces nouvelles notations dans l'équation :eq:`eq-assemble_tmp`, en ramenant la somme sur les sommets à uniquement les sommets du triangle considéré :

.. math:: A = \sum_{p=0}^{\Nt-1}\sum_{i=0}^{2}\sum_{j=0}^{2}a_{p}(\mphi_j^p,\mphi_i^p) \ee_{\locToGlob(p,i)}^T\ee_{\locToGlob(p,j)}

L'algorithme d'assemblage est alors complet ! Une version pseudo-code est présenté par :ref:`l'algorithme d'assemblage <algo-assemblage>`. Sa complexité est en :math:`\grandO{\Nt} \ll \grandO{\Ns^2}`. Comme :ref:`le premier algorithme <algo-brut-force>`, il possède en plus l'avantage d'être parallélisable.


.. _algo-assemblage: 

.. code-block:: bash
  :caption: Algorithme d'assemblage

  A = 0
  B = 0
  For p = 0:N_t-1
    For i = 0:2
      I = L2G(p,i)
      For j = 0:2
        J = L2G(p,j)
        A(I,J) += a_p(ϕ_j^p,ϕ_i^p)
      EndFor
      B(I) += l_p(ϕ_i^p)
    EndFor
  EndFor

.. proof:remark::
  
  Cet algorithme n'est pas encore utilisable, nous devons calculer la valeur de :math:`a_p(\mphi_j^p,\mphi_i^p)` et :math:`\ell_p(\mphi_i^p)`. De plus, il manque encore les conditions de Dirichlet.


.. raw:: html

    <script defer="defer" src="https://d3js.org/d3.v5.min.js"></script>
    <script defer="defer" src="https://d3js.org/d3-scale-chromatic.v1.min.js</script>
    <script defer="defer" src="../../../_static/js/loc2glob/main.js"></script>
