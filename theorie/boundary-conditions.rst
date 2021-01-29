Conditions aux bords
====================

Neumann hétérogène
------------------

Étudions le problème suivant, similaire à :eq:`eq-exemple-pb` mais pour une condition de Neumann non homogène, avec :math:`\gN\in L^2(\GammaN)`. Dans ce problème, nous avons :math:`\GammaN = \partial\Omega`.

.. math::
  :label: eq-dnNonH
  
  \left\{ 
   \begin{array}{r c l l}
    -\Delta u + cu &=& f & (\Omega),\\
    \dn u & = & \gN & (\GammaN = \partial \Omega).
  \end{array}
  \right.

Commençons par la formulation variationnelle. Après multiplication par des fonctions test et intégration par partie, nous obtenons

.. math::  \int_{\Omega}\nabla u(\xx) \cdot \nabla v(\xx) \diff\xx +  \int_{\Omega}  u(\xx)v(\xx) \diff\xx  -\int_{\partial\Omega} (\dn u(\xx)) v(\xx) \diff s(\xx) =  \int_{\Omega} f(\xx)  v(\xx) \diff\xx.

En utilisant la condition :math:`\dn u = \gN` sur :math:`\partial\Omega`, nous obtenons la formulation variationnelle suivante :

.. math::
  :label: fvH-dnNonH

  \left\{\begin{array}{l}
    \text{Trouver }u\in\Ho\text{ tel que}\\
    \forall v \in\Ho,\quad a(u,v) = \ell(v),
  \end{array}\right.

avec :math:`a(\cdot,\cdot) \colon\Ho\times\Ho \to \Rb` et :math:`\ell(\cdot) \colon\Ho\to \Rb` définies par

.. math::
  
  \begin{array}{r c l}
    a(u,v) &:=& \displaystyle\int_{\Omega}\nabla u(\xx) \cdot \nabla v(\xx) \diff\xx +
    \int_{\Omega}  u(\xx)v(\xx) \diff\xx\\
    \ell(v) &:= &\displaystyle\int_{\GammaN} g(\xx)v(\xx) \diff s(\xx)  + \int_{\Omega} f(\xx)v(\xx) \diff\xx.
  \end{array}

Pour pouvoir appliquer le Théorème de Lax-Milgram, nous savons par le cas de Neumann homogène que l'application :math:`a(\cdot,\cdot)` est continue et coercive.  Rien de neuf sous le soleil me direz-vous ? Oui mais non :

- Nous ne savons pas si :math:`\ell(\cdot)` est continue
- Pire encore,  est-ce que le terme :math:`\int_{\GammaN} g(\xx)v(\xx) \diff s(\xx)` a un sens quand :math:`v` est dans :math:`\Ho` ?


Nous n'avons en effet pas (encore) donné de sens à la trace sur :math:`\GammaN` d'une fonction de :math:`\Ho`, c'est-à-dire à :math:`v|_{\GammaN}`. C'est l'objet du théorème ci-dessous (admis).

.. proof:theorem:: Continuité de la Trace (admis)

  Soit :math:`\Gamma\subset\partial\Omega` une partie du bord de mesure non nulle au sens de la mesure de surface. Alors il existe une unique application :math:`\gamma_{\Gamma}\colon\Ho\to L^2(\Gamma)` qui est continue au sens de :math:`\normH{\cdot}` :

  .. math:: \exists C>0 \text{ tel que } \forall v \in\Ho, \; \norm{\gamma_{\Gamma}(v)}_{L^2(\partial\Omega)} \leq C\normH{v}.

  Cette application est de plus caractérisée par

  .. math:: \forall\varphi\in \Cscr^1(\overline{\Omega}),\qquad \gamma_{\Gamma}(\varphi) = \varphi|_{\Gamma}.


Ce théorème nous permet de montrer que la forme :math:`\ell` a un sens (chaque quantité existe) et est bien continue puisque, pour tout :math:`v` de :math:`\Ho` :

.. math:: 
  
  \begin{aligned}
    \abs{\ell(v)}  &\leq \abs{\int_{\Omega} f(\xx) v(\xx)\diff\xx} + \abs{\int_{\partial\Omega} \gN(\xx)v(\xx)\diff\xx} & \text{Inégalité classique}\\
    &\leq   \abs{\int_{\Omega} f(\xx) v(\xx)\diff\xx}+ \abs{\int_{\partial\Omega} \gN(\xx) \gamma_{\partial\Omega}(v(\xx))} &\text{Réécriture}\\
    &\leq \normL{f}\normL{v} + \norm{g}_{L^2(\partial\Omega)}\norm{\gamma_{\partial\Omega}(v)}_{L^2(\partial\Omega)} &\text{Cauchy-Schwarz}\\
    &\leq \left(\normL{f} + C\norm{g}_{L^2(\partial\Omega)}\right)\normH{v} & \text{Cont. Trace}.
  \end{aligned}


Nous pouvons en conclure que :eq:`fvH-dnNonH` admet une unique solution par le Théorème de Lax-Milgram.


Dirichlet homogène
------------------


Considérons le problème suivant où :math:`\GammaD = \partial\Omega` et :math:`\GammaN = \emptyset` avec la fonction :math:`\gD \in L^2(\GammaD)`.


.. math::
  :label: eq-DiriNonH
  
  \left\{ 
   \begin{array}{r c l l}
    -\Delta u + cu &=& f & (\Omega),\\
    u & = & \gD & (\GammaD = \partial \Omega).
  \end{array}
  \right.

Nous avons vu que nous devons imposer à :math:`u` et :math:`v` d'appartenir à :math:`\HoD` :

.. math:: \HoD = \enstq{v\in\Ho}{\gamma_{\GammaD} v = 0}

Nous savons maintenant ce que signifie la trace d'une fonction sur une partie du bord. En multipliant par une fonction test :math:`v`, en intégrant sur :math:`\Omega` et en utilisant la formule de Green, nous obtenons donc la formulation faible suivante :

.. math::
  :label: fv-DiriNonH

  \left\{
    \begin{array}{l}
      \text{Trouver } u\in\Hoz\text{ tel que }\\
      \displaystyle \forall v \in \Hoz,\quad a(u,v) = \ell(v),
    \end{array}
    \right.

avec

.. math::

  \left\{
    \begin{aligned}
      a(u,v) &=  \int_{\Omega} \nabla u\cdot\nabla v + c \int_{\Omega}uv \\
      \ell(v) &=\int_{\Omega} f v.
    \end{aligned}
  \right.

Nous souhaitons appliquer le Théorème de Lax-Migram sur cette formulation faible, commençons par démonter que :math:`\HoD` est complet.

.. proof:theorem::

  L'espace :math:`\HoD` est un espace de Hilbert.

.. proof:proof::

  Par la définition de l'espace, nous avons :math:`\HoD = \ker(\gamma_{\GammaD})`. Nous avons vu que l'application trace est continue, son noyau est alors fermé. L'espace :math:`\HoD` est un sous-espace fermé de :math:`\Ho` qui est un Hilbert : :math:`\HoD` est donc également un espace de Hilbert.

Nous vérifions maintenant les autres hypothèses du théorème de Lax-Milgram pour démontrer l'existence et l'unicité de la solution à la formulation variationnelle ci-dessus :

1. :math:`\HoD` est un espace de Hilbert
2. Continuité de :math:`\ell(\cdot)` (idem que pour Neumann homogène !):

  .. math::
    
    \begin{aligned}
      \abs{\ell(v)}  &= \underbrace{\abs{\int_{\Omega} fv}}_{\PSL{f}{v}}\\ 
      & \leq  \normL{f}\normL{v} & \text{inégalité triangulaire dans}  \Lo\\
      & \leq   \normL{f}\normH{v} & \text{inégalité des normes} \\
    \end{aligned}

3. Continuité de :math:`a(\cdot,\cdot)` (idem que pour Neumann !):

  .. math::
    
    \begin{aligned}
      \abs{a(u,v)}  &= \abs{\int_{\Omega} \nabla u \cdot \nabla v + c\int_{\Omega} u v}\\ 
      & \leq  \underbrace{\abs{\int_{\Omega} \nabla u \cdot \nabla v}}_{\PSLd{\nabla u}{\nabla v}} + \abs{c}\underbrace{\abs{\int_{\Omega} u v}}_{\PSL{u}{v}} & \text{inégalité classique}\\
      & \leq  \normLd{\nabla u}\normLd{\nabla v} + \abs{c} \normL{u}\normL{v} & \text{inégalité triangulaire dans}  \Lo\\
      & \leq   \normH{u}\normH{v}+ \abs{c} \normH{u}\normH{v} & \text{inégalité des normes} \\
      & \leq   (1+c)\normH{u}\normH{v}
    \end{aligned}

4. Coercivité de :math:`a(\cdot,\cdot)` :

  .. math::  \forall u\in\Hoz,\quad a(u,u) = \int_{\Omega}\nabla u\cdot \nabla u = \normL{\nabla u}^2\ldots

La coercivité est en réalité compliquée à obtenir puisque nous aimerions avoir :  

.. math:: \normL{\nabla u}^2 \geq C \normH{u}^2 = C\left(\normL{\nabla u}^2 + \normL{u}^2\right),

et fort heureusement c'est le cas, grâce à l'inégalité de Poincaré, donné par le théorème suivant.

.. proof:theorem:: Inégalité de Poincaré (Admis)

  Il existe une constante :math:`C>0` telle que, pour tout :math:`u\in\Hoz`, nous avons :

  .. math::   \normL{\nabla u}^2 \geq C \normH{u}^2.


.. proof:remark:: 

  L'inégalité de Poincaré est aussi valable si la condition de Dirichlet n'est posée que sur une partie du bord, c'est à dire si :math:`\GammaD \subset\partial\Omega` et :math:`\GammaD\neq\partial\Omega`.

Au final, toutes les conditions du théorème de Lax-Milgram sont vérifiées et le problème :eq:`fv-DiriNonH` admet une unique solution.

Dirichlet hétérogène
--------------------

