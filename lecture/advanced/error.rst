Erreur comise et convergence
============================


Méthode de Galerkin : Erreur commise
------------------------------------

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

.. proof:remark:: 

  Les résultats présentés dans cette section ne dépendent pas du choix de l'espace éléments finis : :math:`V_h` est "arbitraire".

Converge des éléments finis :math:`\Pb^1`
-----------------------------------------