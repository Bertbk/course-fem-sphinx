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

Remarquons tout d'abord que la formulation faible :eq:`eq3-pbmodelh` admet une unique solution

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

  Le problème  :eq:`eq3-pbmodelh` admet toujours une unique solution d'après le Théorème de Lax-Milgram. Comme :math:`\Vh` est de dimension finie, notée :math:`\Nh`, nous pouvons en extraire une base :math:`(\mphi{1}, \mphi{2}, \ldots, \mphi{\Nh})` et écrire

  .. math:: \uh = \sum_{I=0}^{\Nh-1} u_I \mphi{I}.

  La formulation faible peut alors se réécrire sur les fonctions de cette base uniquement :

  .. math::  \forall I, \qquad \sum_{J=0}^{\Nh-1}  a(\mphi{J},\mphi{I}) u_J = \ell(\mphi{I}),

  ou encore

  .. math:: A_h U_h = B_h,

  avec :math:`A_h = (a(\mphi{j}, \mphi{i}))_{ 1\leq i,j\leq \Nh}`, :math:`U_h=(u_I)_{1\leq j \leq \Nh}` et :math:`B_h=(\ell(\mphi{i}))_{1\leq i\leq \Nh}`. Montrons maintenant que la matrice :math:`A_h` est définie positive : 

  .. math::
  
    \begin{aligned}
    \forall W_h\in\Rb^{\Nh}, W_h = (w_i)_{1\leq i \leq \Nh},\\
    \PS{W_h}{A_hW_h} = \overline{W_h^T}A_h W_h 
    &= \sum_{i=1}^{\Nh} \sum_{j=1}^{\Nh} \overline{w_j}a(\mphi{i},\mphi{j})w_i \\
    &= \sum_{i=1}^{\Nh}\sum_{j=1}^{\Nh}a(w_i\mphi{i}, w_j\mphi{j})\\
    &= a\left(\sum_{i=1}^{\Nh}w_i\mphi{i}, \sum_{j=1}^{\Nh}w_j\mphi{j}\right)
    \end{aligned}

  L'indice :math:`j` étant muet, nous pouvons changer son intitulé : 

  .. math:: \PS{W_h}{A_hW_h} = a\left(\sum_{i=1}^{\Nh}w_i\mphi{i}, \sum_{i=1}^{\Nh}w_i\mphi{i}\right)

  Nous utilisons maintenant la coercivité de :math:`a(\cdot,\cdot)` :

  .. math:: \PS{W_h}{A_hW_h} \geq \alpha\normV{\sum_{i=1}^{\Nh}w_i\mphi{i}}^2.

  Comme :math:`\alpha > 0`, alors le terme :math:`\PS{W_h}{A_hW_h}` est nul si et seulement si :math:`\normV{\sum_{i=1}^{\Nh}w_i\mphi{i}}` est nulle et donc si et seulement si :math:`\sum_{i=1}^{\Nh}w_i\mphi{i}` est la fonction nulle. Comme la famille :math:`(\mphi{i})_{1\leq i \leq \Nh}` forme une base de :math:`\Vh`, cela revient à dire que :math:`w_i = 0` pour tout :math:`i` et donc que :math:`W_h` est le vecteur nul. Nous avons donc montré que 

  .. math:: \forall W_h\in\Rb^{\Nh}\setminus\{0\}, \qquad \PS{W_h}{A_h W_h} > 0.


.. proof:remark::

  Quelques remarques :

  - La matrice :math:`A_h` *discrétise* l'opérateur :math:`a(\cdot,\cdot)` au sens où elle est de taille finie.
  - La **coercivité** d'une forme :math:`a(\cdot,\cdot)` est, en quelque sorte, l'équivalent de la **définie positivité** de sa matrice. La coercivité s'applique au domaine "continu" (les *fonctions* ou *opérateurs*) tandis que la définie positivité est un terme appliqué au domaine "algébrique" (les *matrices* (infinies ou non)).  
  - L'hypothèse de Lax-Milgram sur la **coercivité** de :math:`a(\cdot,\cdot)` est une **hypothèse forte** puisque la matrice :math:`A_h` discrétisant :math:`a(\cdot,\cdot)` doit être **définie positive** !


Erreur commise
--------------

Nous quantifions maintenant l'erreur commise en approchant :math:`u` par :math:`\uh` grâce au Lemme de Céa. Avant cela, notons une propriété très intéressante de la solution approchée :math:`\uh` : l'erreur commise est orthogonale à l'espace :math:`\Vh` :

.. proof:lemma::
  
  Soit :math:`u` la solution exacte (*i.e.* solution de \eqref{eq3-pbmodel}) et :math:`\uh` la solution approchée (*i.e.* solution de :eq:`eq3-pbmodelh`). Soit :math:`e_h = u-\uh` est l'erreur d'approximation, alors nous avons l'égalité suivante

  .. math:: \forall \vh\in \Vh,\qquad a(e_h, \vh) = 0.

.. proof:proof::

  Comme :math:`\Vh\subset V`, nous pouvons choisir :math:`v=\vh` dans la formulation variationnelle \eqref{eq3-pbmodel}:

  .. math::
    
    \begin{aligned}
        \forall \vh\in \Vh,\quad a(u-\uh,\vh) &= a(u,\vh) - a(\uh,\vh) \\
        & = \ell(\vh) - \ell(\vh) \\
        & = 0
    \end{aligned}



.. proof:remark::

  Si :math:`a(\cdot,\cdot)` est symmétrique, le lemme précédent implique que l'erreur est orthogonale à :math:`\Vh` par rapport au produit scalaire :math:`a(\cdot,\cdot)`.


Nous pouvons maintenant montrer que l'erreur d'approximation :math:`\uh` de :math:`u` est uniformément bornée par la distance entre :math:`u` et l'espace :math:`\Vh`. Ce résultat est connu comme étant `le Lemme de Céa <https://fr.wikipedia.org/wiki/Lemme_de_C%C3%A9a>`_, démontré par `Jean Céa <https://fr.wikipedia.org/wiki/Jean_C%C3%A9a>`_ durant `sa thèse <http://archive.numdam.org/article/AIF_1964__14_2_345_0.pdf/>`_, en 1964.

.. proof:lemma:: de Céa

  Soit :math:`u` la solution exacte (*i.e.* solution de \eqref{eq3-pbmodel}) et :math:`\uh` la solution approchée (*i.e.* solution de :eq:`eq3-pbmodelh`). Nous avons

  .. math:: \normV{u-\uh}\leq \frac{M}{\alpha}\inf_{\vh\in \Vh}\normV{u-\vh},

  où :math:`M` et :math:`\alpha` sont respectivement les constantes de continuité et de coercivité de :math:`a(\cdot,\cdot)` qui apparaissent dans le Théorème de Lax-Milgram.

.. proof:proof::

  Pour :math:`\vh\in \Vh`, la quantité :math:`\vh-\uh` est aussi un élément de :math:`\Vh`, ce qui implique d'après le lemme précédent que

  .. math::

    \begin{aligned}
    a(u - \uh, u - \uh)  &= a(u - \uh, u-\vh + \vh-\uh) \\
    &= a(u - \uh, u-\vh) + a(u-\uh, \vh-\uh)\\
    &= a(u - \uh, u-\vh).
    \end{aligned}

  La coercivité et la continuité de :math:`a(\cdot,\cdot)` impliquent que
  
  .. math::

    \begin{aligned}
    \forall \vh\in \Vh,\quad \alpha\normV{u-\uh}^2 &\leq \Re\left[a(u - \uh, u - \uh)\right]  \\
    &\leq \Re\left[a(u - \uh, u - \vh)\right] \\
    &\leq \abs{a(u - \uh, u - \vh)} \\
    &\leq M\normV{u-\uh}\normV{u-\vh}.
    \end{aligned}

  Nous en déduisons le résultat cherché :

  .. math:: \forall \vh\in \Vh,\qquad \normV{u-\uh}\leq\frac{M}{\alpha}\normV{u-\vh}.



.. proof:remark::
  
  Le point important du Lemme de Céa est de remplacer le problème d'estimation de l'erreur par un problème d'approximation. En effet, il nous suffit de montrer que la solution est "bien approchée" par les fonctions de :math:`\Vh` pour savoir que l'erreur ne sera *qu'une constante fois plus grande* que cette erreur d'approximation. 


.. proof:lemma::

  Soit :math:`\Pi_h : V \to \Vh` un **opérateur d'interpolation** tel que 

  .. math:: \forall v \in V, \qquad \lim_{h\to 0}\normV{v - \Pi_h v} = 0, 

  alors la méthode de Galerkin converge, c'est-à-dire : 

  .. math:: \lim_{h\to 0}\normV{u-\uh} = 0. 


.. proof:proof::

  C'est une conséquence directe du lemme de Céa, puisque : 

  .. math::  0 \leq \normV{u-\uh} \leq \frac{M}{\alpha}\normV{u - \Pi_hu} \to 0 \quad (h\to 0). 
