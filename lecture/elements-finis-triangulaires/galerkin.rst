Méthode de Galerkin
===================

Contexte
--------

Dans ce chapitre nous considérons un espace de Hilbert :math:`V` muni du produit scalaire :math:`\PSV{\cdot}{\cdot}` et de sa norme associée :math:`\normV{\cdot}`. Nous considérons la formulation variationnelle suivante

.. math::
  :label: eq3-pbmodel

  \left\{
    \begin{array}{l}
      \text{Trouver } u\in V \text{ tel que}\\
      \forall v\in V,\quad a(u,v) = \ell(v).
    \end{array}
  \right.


Les formes continues :math:`a(\cdot,\cdot)` et :math:`\ell(\cdot)` sont respectivement bilinéaire et linéaire, et :math:`a(\cdot,\cdot)` est de plus coercive. De cette manière, le Théorème de Lax-Milgram s'applique et le problème :eq:`eq3-pbmodel` admet une unique solution.

Nous noterons :math:`\PSV{\cdot}{\cdot}` et :math:`\normV{\cdot}` respectivement le produit scalaire et la norme sur :math:`V`.

Dimension finie
---------------

Obtenir une solution de :eq:`eq3-pbmodel` est compliqué car :math:`V` est (a priori) de dimension infinie. La méthode de Galerkin consiste à "approcher" l'espace fonctionnel :math:`V` par un espace :math:`\Vh\subset V`, de **dimension finie**, mais toujours de Hilbert, et ce pour le même produit scalaire ! La formulation faible :eq:`eq3-pbmodel` est alors résolue dans :math:`\Vh` uniquement, avec pour solution :math:`\uh` :

.. math:: 
  :label: eq3-pbmodelh

  \left\{
    \begin{array}{l}
      \text{Trouver } \uh\in \Vh \text{ tel que}\\
      \forall \vh\in \Vh,\quad a(\uh,\vh) = \ell(\vh).
    \end{array}
  \right.

On espère alors que cette solution approchée :math:`\uh` soit une bonne estimation de la solution exacte :math:`u`, c'est-à-dire que

.. math:: \lim_{h\to 0}\normV{\uh-u} = 0.

Remarquons tout d'abord que la formulation faible :eq:`eq3-pbmodelh` admet une unique solution.

.. proof:lemma::

  Le problème "approché" :eq:`eq3-pbmodelh` admet une unique solution.

.. proof:proof::

    L'espace :math:`\Vh\subset V` est un sous-espace de Hilbert de :math:`V`, nous pouvons donc appliquer le Théorème de Lax-Milgram, dont les hypothèses sur :math:`a(\cdot,\cdot)` et :math:`\ell(\cdot)` sont toujours vérifiées sur :math:`\Vh`.


Travailler dans un espace de dimension finie présente un très grand avantage : on peut en extraire une **base de taille finie** et ramener le calcul de :math:`\uh` à la **résolution d'un système linéaire**, pour lequel les outils (numériques) ne manquent pas. Citons par exemple les bibliothèques suivantes :

- `MUMPS <http://mumps.enseeiht.fr/>`_ : solveur open-source direct parallèle
- `Pardiso <https://software.intel.com/en-us/mkl-developer-reference-fortran-intel-mkl-pardiso-parallel-direct-sparse-solver-interface>`_ : solveur direct parallèle privatif d'Intel
- `PETSc <https://www.mcs.anl.gov/petsc/>`_ : Bibliothèque contenant entres autres de nombreux solveurs directs (dont MUMPS) ou itératifs (GMRES, ...)

.. proof:lemma::

  Soit :math:`V` un espace de Hilbert et :math:`\Vh` un sous espace de dimension finie. Soit :math:`a(\cdot,\cdot)` une forme bilinéaire continue et coercive sur :math:`V`, :math:`\ell(\cdot)` une forme linéaire continue sur :math:`V`. Le problème approché :eq:`eq3-pbmodelh` admet une unique solution. De plus, cette solution s'obtient par la résolution d'un système linéaire de matrice définie positive.

.. proof:proof::

  Le problème  :eq:`eq3-pbmodelh` admet toujours une unique solution d'après le Théorème de Lax-Milgram. Comme :math:`\Vh` est de dimension finie, notée :math:`\Nh`, nous pouvons en extraire une base :math:`(\mphi_{1}, \mphi_{2}, \ldots, \mphi_{\Nh})` et écrire

  .. math:: \uh = \sum_{I=1}^{\Nh} u_I \mphi_I.

  La formulation faible peut alors se réécrire sur les fonctions de cette base uniquement :

  .. math::  \forall I, \qquad \sum_{J=1}^{\Nh}  a(\mphi_J,\mphi_I) u_J = \ell(\mphi_I),

  ou encore

  .. math:: A_h U_h = B_h,

  avec :math:`A_h = (a(\mphi_J, \mphi_I))_{ 1\leq I,J\leq \Nh}`, :math:`U_h=(u_I)_{1\leq J \leq \Nh}` et :math:`B_h=(\ell(\mphi_I))_{1\leq I\leq \Nh}`. Montrons maintenant que la matrice :math:`A_h` est définie positive : 

  .. math::
  
    \begin{aligned}
    \forall W_h\in\Rb^{\Nh}, W_h = (w_I)_{1\leq I \leq \Nh},\\
    \PS{W_h}{A_hW_h} = W_h^T A_h W_h 
    &= \sum_{I=1}^{\Nh} \sum_{J=1}^{\Nh} w_j a(\mphi_I,\mphi_J)w_I \\
    &= \sum_{I=1}^{\Nh}\sum_{J=1}^{\Nh}a(w_I\mphi_I, w_j\mphi_J)\\
    &= a\left(\sum_{I=1}^{\Nh}w_I\mphi_I, \sum_{J=1}^{\Nh}w_j\mphi_J\right)
    \end{aligned}

  L'indice :math:`J` étant muet, nous pouvons changer son intitulé : 

  .. math:: \PS{W_h}{A_hW_h} = a\left(\sum_{I=1}^{\Nh}w_I\mphi_I, \sum_{I=1}^{\Nh}w_I\mphi_I\right)

  Nous utilisons maintenant la coercivité de :math:`a(\cdot,\cdot)` :

  .. math:: \PS{W_h}{A_hW_h} \geq \alpha\normV{\sum_{I=1}^{\Nh}w_I\mphi_I}^2.

  Comme :math:`\alpha > 0`, alors le terme :math:`\PS{W_h}{A_hW_h}` est nul si et seulement si :math:`\normV{\sum_{I=1}^{\Nh}w_I\mphi_I}` est nulle et donc si et seulement si :math:`\sum_{I=1}^{\Nh}w_I\mphi_I` est la fonction nulle. Comme la famille :math:`(\mphi_I)_{1\leq I \leq \Nh}` forme une base de :math:`\Vh`, cela revient à dire que :math:`w_I = 0` pour tout :math:`I` et donc que :math:`W_h` est le vecteur nul. Nous avons donc montré que 

  .. math:: \forall W_h\in\Rb^{\Nh}\setminus\{0\}, \qquad \PS{W_h}{A_h W_h} > 0.


.. proof:remark::

  Quelques remarques :

  - La matrice :math:`A_h` *discrétise* l'opérateur :math:`a(\cdot,\cdot)` au sens où elle est de taille finie.
  - La **coercivité** d'une forme :math:`a(\cdot,\cdot)` est, en quelque sorte, l'équivalent de la **définie positivité** de sa matrice. La coercivité s'applique au domaine "continu" (les *fonctions* ou *opérateurs*) tandis que la définie positivité est un terme appliqué au domaine "algébrique" (les *matrices* (infinies ou non)).  
  - L'hypothèse de Lax-Milgram sur la **coercivité** de :math:`a(\cdot,\cdot)` est une **hypothèse forte** puisque la matrice :math:`A_h` discrétisant :math:`a(\cdot,\cdot)` doit être **définie positive** !

.. proof:remark::

  La méthode des différences finies discrétise l'opérateur différentiel (:math:`\Delta`) tandis que les éléments finis (issue de la méthode de Galerkin) approche l'espace fonctionnel. C'est une différence majeure ! 