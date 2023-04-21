Application au problème modèle
==============================

Formulation faible
------------------

Considérons un ouvert polygonal connexe :math:`\Omega` et le problème suivant

.. math:: 
  :label: eq-exemple-pb

  \left\{
  \begin{array}{r c l l}
    -\Delta u + c u & = & f & (\Omega)\\
    \dn u & = & 0 & (\GammaN = \Gamma)
  \end{array}
  \right.

Après mutiplication par des fonctions tests et intégrations par partie, nous obtenons la formulation faible de ce problème. 

.. math:: 
  :label: eq-exemple-fv

  \left\{
  \begin{array}{l}
    \text{Trouver } u \in\Ho \text{ tel que }\\
    \displaystyle \forall v \in \Ho,  a(u,v)=\ell(v)
  \end{array}
  \right.

avec :math:`a(\cdot,\cdot) \colon \Ho\times\Ho\to\Rb` et :math:`\ell(\cdot)\colon\Ho\to\Rb` définies pas

.. math::

  \left\{
  \begin{aligned}
    a(u,v) &= \int_{\Omega}\nabla u \cdot\nabla v+ c\int_{\Omega}uv \\
    \ell(v) & = \int_{\Omega}fv 
  \end{aligned}
  \right.

Existence et unicité
--------------------

Tentons d'appliquer le théorème de Lax-Milgram à cette formulation faible

1. :math:`\Ho` est un espace de Hilbert
2. :math:`\ell(\cdot)` est clairement linéaire (du fait de l'intégrale)
3. :math:`a(\cdot,\cdot)`  est bilinéaire, pour la même raison
4. Continuité de :math:`\ell(\cdot)` : prenons une fonction :math:`v\in\Ho` :

.. math:: 

  \begin{aligned}
    \abs{\ell(v)}  &= \underbrace{\abs{\int_{\Omega} fv}}_{\PSL{f}{v}}\\ 
    & \leq  \normL{f}\normL{v} & \text{Cauchy-Schwarz}\\
    & \leq   \underbrace{\normL{f}}_{\text{Constant}}\normH{v} & \text{inégalité des normes} \\
  \end{aligned}

5. Continuité de :math:`a(\cdot,\cdot)` : prenons deux fonctions :math:`u` et :math:`v` de :math:`\Ho` :  

.. math:: 

  \begin{aligned}
    \abs{a(u,v)}  &= \abs{\int_{\Omega} \nabla u \cdot \nabla v + c\int_{\Omega} u v}\\ 
    & \leq  \underbrace{\abs{\int_{\Omega} \nabla u \cdot \nabla v}}_{\PSLd{\nabla u}{\nabla v}} + \abs{c}\underbrace{\abs{\int_{\Omega} u v}}_{\PSL{u}{v}} & \text{inégalité classique}\\
    & \leq  \normLd{\nabla u}\normLd{\nabla v} + \abs{c} \normL{u}\normL{v} & \text{inégalité triangulaire dans}  \Lo\\
    & \leq   \normH{u}\normH{v}+ \abs{c} \normH{u}\normH{v} & \text{inégalité des normes} \\
    & \leq   (1+c)\normH{u}\normH{v}
  \end{aligned}

6. Coercivité de :math:`a(\cdot, \cdot)` : prenons une fonction :math:`u\in\Ho` :

.. math:: 

  \begin{aligned}
    a(u,u)  &= \int_{\Omega} \nabla u \cdot \nabla u + c\int_{\Omega} u u = \int_{\Omega} \|\nabla u\|^2 + c\int_{\Omega} |u|^2\\ 
     &\geq \min(1,c)\left(\int_{\Omega} \|\nabla u\|^2 + \int_{\Omega} |u|^2\right)\\ 
     &\geq \min(1,c)\normH{u}^2 
  \end{aligned}

Toutes les conditions sont réunies : le problème :eq:`eq-exemple-fv` admet une unique solution d'après le théorème de Lax-Milgram.

.. prf:remark::

  Dans la démonstration de la continuité de :math:`\ell`, n'écrivez pas :math:`\normL{f}\leq \normH{f}` car, d'une part nous n'en avons pas besoin, d'autre part, nous ne savons pas si :math:`f\in\Ho` !

.. TODO:

  Réciprocité
  -----------

  Si :math:`u\in\Cscr^2(\overline{\Omega})\subset\Ho`, nous savons que si :math:`u` est solution de l'EDP :eq:`eq-exemple-pb` alors :math:`u` est aussi solution de la formulation faible :eq:`eq-exemple-fv`. Nous savons aussi que cette formulation faible :eq:`eq-exemple-fv` admet une unique solution dans :math:`\Ho`. Réciproquement, si :math:`u\in\Ho` et est solution de la formulation faible :eq:`eq-exemple-fv`, est-ce que :math:`u` est solution forte de l'EDP ? La réponse est "oui mais" : :math:`u` doit être plus régulière, par exemple :math:`\Hoo`, auquel cas l'EDP sera vérifiée au sens faible. C'est ce que nous montrons maintenant. Introduisons juste avance cela l'espace :math:`\Hoo` des fonctions de :math:`\Ho` qui possèdent une dérivée faible seconde dans chaque direction :

  .. math:: \Hoo = \enstq{v \in \Ho}{\forall i,j, \quad \partial_i\partial_j v\in \Lo}.


  .. prf:lemma::

    Supposons que la formulation faible :eq:`eq-exemple-fv` admette une unique solution :math:`u\in\Ho` et que cette solution appartienne à :math:`\Hoo`. Alors :math:`u` vérifie l'EDP :eq:`eq-exemple-pb` au sens faible, c'est à dire "presque partout".
    
  .. prf:proof::

    Nous pouvons dérouler le théorème de Green "à l'envers". Pour tout :math:`v\in\Ho`, nous avons

    .. math::

      \begin{aligned}
        &a(u,v) = \ell(v) \\
        \implies     & \int_{\Omega}\nabla u\cdot\nabla v + c \int_{\Omega}uv= \int_{\Omega}fv\\
        \implies      & \int_{\Omega}\nabla u\cdot\nabla v + \underbrace{\int_{\partial \Omega}(\dn u)v}_{0}+ c \int_{\Omega}uv= \int_{\Omega}fv &\text{Ajouter 0}\\
        \implies      & -\int_{\Omega}(\Delta u) v  + c \int_{\Omega}uv= \int_{\Omega}fv &\text{Th. Green}\\
        \implies      & \int_{\Omega}(-\Delta u + cu -f) v= 0\\
      \end{aligned}

    La relation est valable pour tout :math:`v\in\Ho`, elle est donc aussi valable pour tout :math:`v\in\Cscr^{\infty}_c(\Omega)`. Le corollaire :numref:`{number} <corollary-f-zero>` nous permet alors d'affirmer que :math:`-\Delta u + cu -f = 0` presque partout.

Conclusion
----------

Schématiquement, nous avons :

- Si :math:`u` est solution de :eq:`eq-exemple-pb` alors :math:`u` est solution de :eq:`eq-exemple-fv`
- Le problème :eq:`eq-exemple-fv` admet une unique solution qui appartient (au moins) à :math:`\Ho`

.. prf:remark::

  Pourquoi travailler dans :math:`\Ho` et non dans :math:`\Cscr^1(\overline{\Omega})` ? La question est légitime, d'autant que :math:`\normH{\cdot}` est une norme de :math:`\Cscr^1(\overline{\Omega})` ! Mais... :math:`\Cscr^1(\overline{\Omega})` n'est pas complet pour cette norme et n'est donc pas un espace de Hilbert si on lui adjoint cette norme : le théorème de Lax-Milgram ne pourra alors pas s'y appliquer. Il existe des normes qui complètent :math:`\Cscr^1(\overline{\Omega})`, mais les hypothèses du théorème de Lax-Milgram sont elles toujours validées avec ces normes ?