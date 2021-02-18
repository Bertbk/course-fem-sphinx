Erreur comise et convergence
============================


Méthode de Galerkin : Erreur commise
------------------------------------

Nous considérons ici une formulation variationnelle abstraite :

.. math::
  :label: cv-pbmodel

  \left\{
    \begin{array}{l}
      \text{Trouver } u\in V \text{ tel que}\\
      \forall v\in V,\quad a(u,v) = \ell(v).
    \end{array}
  \right.


Les formes continues :math:`a(\cdot,\cdot)` et :math:`\ell(\cdot)` sont respectivement bilinéaire et linéaire, et :math:`a(\cdot,\cdot)` est de plus coercive. De cette manière, le Théorème de Lax-Milgram s'applique et le problème :eq:`cv-pbmodel` admet une unique solution. Nous noterons :math:`\PSV{\cdot}{\cdot}` et :math:`\normV{\cdot}` respectivement le produit scalaire et la norme sur :math:`V`.

Nous restons dans un cadre abstrait et introduisons :math:`\Vh`, un sous-espace fonctionnel de :math:`V`, de Hilbert et de dimension finie. Nous appliquons la méthode de Galerkin pour obtenir la formulation faible "approchée" :

.. math::
  :label: cv-pbmodelh

  \left\{
    \begin{array}{l}
      \text{Trouver } u_h\in \Vh \text{ tel que}\\
      \forall \vh\in \Vh,\quad a(\uh,\vh) = \ell(\vh).
    \end{array}
  \right.

Nous quantifions maintenant l'erreur commise en approchant :math:`u` par :math:`\uh`, ou plus exactement, :math:`V` par :math:`\Vh`.  Notons une propriété très intéressante de la solution approchée :math:`\uh` :

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

  Soit :math:`u` la solution exacte (*i.e.* solution de \eqref{cv-pbmodel}) et :math:`\uh` la solution approchée (*i.e.* solution de :eq:`cv-pbmodelh`). Nous avons

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
    \forall \vh\in \Vh,\quad \alpha\normV{u-\uh}^2 &\leq \abs{a(u - \uh, u - \uh)} \\
    &\leq \abs{a(u - \uh, u - \vh)} \\
    &\leq M\normV{u-\uh}\normV{u-\vh}.
    \end{aligned}

  Nous en déduisons le résultat cherché :

  .. math:: \forall \vh\in \Vh,\qquad \normV{u-\uh}\leq\frac{M}{\alpha}\normV{u-\vh}.



.. proof:remark::
  
  Le point important du Lemme de Céa est de remplacer le problème d'estimation de l'erreur par un problème d'approximation. En effet, il nous suffit de montrer que la solution est "bien approchée" par les fonctions de :math:`\Vh` pour savoir que l'erreur ne sera *qu'une constante fois plus grande* que cette erreur d'approximation. 


Nous pouvons maintenant donner une condition pour que la méthode de Galerkin converge.

.. _lemme-cv-galerkin:

.. proof:lemma::

  Soit :math:`\Pi_h : V \to \Vh` un **opérateur d'interpolation** tel que 

  .. math:: \forall v \in V, \qquad \lim_{h\to 0}\normV{v - \Pi_h v} = 0, 

  alors la méthode de Galerkin converge, c'est-à-dire : 

  .. math:: \lim_{h\to 0}\normV{u-\uh} = 0. 


.. proof:proof::

  C'est une conséquence directe du lemme de Céa, puisque : 

  .. math::  0 \leq \normV{u-\uh} \leq \frac{M}{\alpha}\normV{u - \Pi_hu} \to 0 \quad (h\to 0). 


La propriété demandée à l'opérateur de projection :math:`\Phi_h \colon V \to \Vh` est assez naturel : plus :math:`h` est petit et plus le projeté d'une fonction :math:`v\in V` doit être proche de :math:`v`. Nous pouvons voir cela comme l'espace :math:`\Vh` est "proche" de :math:`V`.


Converge des éléments finis :math:`\Pb^1`
-----------------------------------------

Afin de montrer que la méthode des éléments finis :math:`\Pb^1` converge, nous devons obtenir un opérateur d'interpolation et montrer qu'il vérifie l'hypothèse nécessaire :numref:`du lemme {number} <lemme-cv-galerkin>`.

TODO: ! 