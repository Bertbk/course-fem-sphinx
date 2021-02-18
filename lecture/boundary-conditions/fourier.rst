Condition de Fourier
====================

Problème
--------

Étudions le problème suivant pour :math:`f` et :math:`g` suffisamment régulières :

.. math::
  :label: eq-dnNonH

  \left\{ 
   \begin{array}{r c l l}
    -\Delta u +u &=& f & (\Omega),\\
    \dn u +  u& = & g & (\Gamma := \partial \Omega).
  \end{array}
  \right.

La condition de Fourier (ou Robin ou Fourier-Robin) s'écrit aussi :math:`\dn u = g -u` sur :math:`\Gamma`. Après calcul, la formulation variationnelle s'écrit

.. math:: \left\{ 
  \begin{array}{r c l l}
    \text{Trouver }u\in\Ho\text{ tel que }\\
    \forall v\in\Ho, a(u,v) = \ell(v),
  \end{array}
  \right.

avec (:math:`\gamma` est l'application trace sur :math:`\Gamma`) :

.. math:: \begin{array}{l c c l}
  a \colon & \Ho\times\Ho & \to &\Ho\\
        & (u,v)&\mapsto& \displaystyle \int_{\Omega}\nabla u\cdot\nabla v +  \int_{\Omega} u  v + 
   \int_{\Gamma} \gamma(u)  \gamma(v)\\
  \ell \colon & \Ho & \to &\Ho\\
          & v&\mapsto& \displaystyle \int_{\Omega}f v + \int_{\Gamma}g \gamma(v)
   \end{array}

Existence et unicité
--------------------

Nous avons vu que dans :numref:`la section {number} consacrée à Neumann hétérogème <sec-neumann-heterogene>` que les intégrales sur le bord ont un sens du fait de l'existence de l'opérateur trace. Pour une condition de Neumann, l'opérateur :math:`\ell` est le même et nous avons déjà vu dans :numref:`la section {number} <sec-neumann-heterogene>` qu'il vérifie les hypothèses du Théorème de Lax-Milgram. Il ne nous reste qu'à vérifier que :math:`a(\cdot,\cdot)` est bilinéaire (trivial), continue  et coercive.

- Continuité de :math:`a(\cdot,\cdot)` pour tout :math:`u,v\in\Ho` :

.. math:: \begin{aligned}
  \abs{a(u,v)} &= \abs{\int_{\Omega}\nabla u\cdot\nabla v +  \int_{\Omega} u  v + \int_{\Gamma} \gamma(u)  \gamma(v)}\\
  & \leq  \abs{\int_{\Omega}\nabla u\cdot\nabla v +  \int_{\Omega} u  v} +  \abs{\int_{\Gamma} \gamma(u)  \gamma(v)} & \text{Inégalité Triang.}\\
    & \leq  \normH{u} \normH{v}+\norm{\gamma(u)}_{L^2(\Gamma)} \norm{\gamma(v)}_{L^2(\Gamma)}& \text{Cauchy-Schwarz}\\
    & \leq  \normH{u} \normH{v} + C^2\normH{u}\normH{v}& \text{Cont. Trace}\\
    & \leq  (1 + C^2)\normH{u} \normH{v}\\
  \end{aligned}

La constante :math:`C` est la constante de continuité de l'opérateur Trace sur :math:`\Gamma` définie dans :numref:`le théorème {number} <thm-trace>`.

- Coercivité de :math:`a(\cdot,\cdot)`, avec :math:`u\in\Ho` :

.. math:: \begin{aligned}
  a(u,u) & = \dsp\int_{\Omega}\nabla u\cdot\nabla u +  \int_{\Omega} u u + \int_{\Gamma} \gamma(u) \gamma(u)\\
    & =  \dsp \normH{u}^2+ \underbrace{\int_{\Gamma} \abs{\gamma(u)}^2}_{\geq 0}\\
    & \geq  \dsp \normH{u}^2
  \end{aligned}

Le problème admet donc une unique solution.

Matrice de masse sur le bord
----------------------------

Après discrétisation dans la base éléments finis, nous sommes ramenés à la résolution du système linéaire

.. math:: A U = b,

où la matrice :math:`A` et le vecteur :math:`b` sont donnés par

.. math:: \begin{aligned}
    A(I,J) &=\int_{\Omega}\nabla \mphi_{J}\cdot\nabla \mphi_I +  \int_{\Omega} \mphi_{J} \mphi_I +  \int_{\Gamma} \mphi_{J}|_{\Gamma}  \mphi_I|_{\Gamma}\\
    B(I) &=\int_{\Omega} f  \mphi_I +  \int_{\Gamma}g  \mphi_I|_{\Gamma}
  \end{aligned}

Le vecteur :math:`B` se calcule grâce aux formules de quadratures vues dans les paragraphes :numref:`{number} pour les triangles <sec-quadrature>` et dans :numref:`{number} pour les segments <sec-quad-1D>`. La matrice :math:`A` est obtenue par la somme de la matrice de rigidité :math:`D`, de masse :math:`M` et d'une dernière matrice :math:`M_{\Gamma}` de coefficients :

.. math:: M_{\Gamma}(I,J)= \int_{\Gamma} \mphi_{J}|_{\Gamma} \mphi_I|_{\Gamma}.

Cette matrice correspond à une matrice de masse sur le bord :math:`\Gamma`. Nous pouvons tout d'abord remarquer que :math:`\mphi_{I}|_{\Gamma} = 0` dès que :math:`\vertice_{I}` n'est pas sur :math:`\Gamma`. Comme toujours, nous préférons la décomposer en contributions élémentaires où, ici, un élément sera un segment :

.. math:: M_{\Gamma}(I,J)= \sum_{\sigma \in \Gamma}  \int_{\sigma} \mphi_{J}|_{\sigma} \mphi_I|_{\sigma}.

Nous pouvons maintenant remarquer que la somme sur les arêtes n'en est pas une puisque l'intégrale sur :math:`\sigma` est nulle dès que :math:`\vertice_{I}` ou :math:`\vertice_{J}` n'est pas un sommet de l'arête. Cependant, n'oublions pas que nous ne calculons pas les coefficients un à un mais que nous *assemblons* la matrice, autrement dit, nous parcourons chaque segment, calculons toutes les contributions élémentaires associées à ce dernier, et additionnons le tout dans la grande matrice du système. 

Autrement dit et quitte à renuméroter, nous considérons une arête :math:`\sigma = [\vertice_{1}^{\sigma}, \vertice_{2}^{\sigma}]`, nous cherchons à calculer :

.. math:: M^e_{\sigma}(i,j) =\int_{\sigma} \mphi_{j}^{\sigma} \mphi_i^{\sigma},

avec :math:`\mphi_{i}^{\sigma} = \mphi_{I}|_{\sigma}` et :math:`\vertice_{i}^{\sigma} = \vertice_{I}`. La matrice :math:`M^e_{\sigma}` est de dimension 2x2.

Calcul de la matrice
--------------------

Nous introduisons la coordonnée curviligne :math:`t` 

.. math:: \forall \xx \in \sigma, t(\xx) = \frac{\norm{\xx-\vertice_{1}^{\sigma}}}{\norm{\vertice_{1}^{\sigma}-\vertice_{2}^{\sigma}}} \in [0,1].

Quand :math:`\xx = \vertice_{1}^{\sigma}` alors :math:`t=0` et :math:`\xx = \vertice_{2}^{\sigma}` alors  :math:`t=1`.


La trace d'une fonction de forme :math:`\mathbb{P}_1` sur :math:`\sigma` est la "fonction chapeau" 1D classique. Plus précisément :

.. math:: \begin{array}{l}
  \mphi_{1}^{\sigma}(\xx) =\mphi_{1}^{\sigma}(\xx(t)) = \hat{\phi_1}(t) = 1-t\\
  \mphi_{2}^{\sigma}(\xx) =\mphi_{2}^{\sigma}(\xx(t)) = \hat{\phi_2}(t) = t
  \end{array}


À l'inverse, connaissant :math:`t` on peut retrouver le point :math:`\xx` :

.. math:: \xx(t) = (1-t)\vertice_{1} + t\vertice_{2}.

Nous avons une transformation bijective entre :math:`\sigma` et le segment :math:`[0,1]` dit de référence et noté :math:`\hat{\sigma}`. Nous pouvons opérer un changement de variable (:math:`i,j = 1,2`):

.. math:: \int_{\sigma}\mphi_{j}^{\sigma} \mphi_i^{\sigma} \diff \xx= \abs{\sigma}\int_{0}^1\mphi_{j}^{\sigma}(\xx(t)) \mphi_i^{\sigma}(\xx(t)) \diff t = \abs{\sigma}\int_{0}^1\hat{\phi}_{j}(t) \hat{\phi}_i(t) \diff t.

Les coefficients de masse de bord se calculent alors aisément et on obtient : 

.. math:: M^e_{\sigma}(i,j) =\frac{\abs{\sigma}}{6}
  \left(
    \begin{array}{c c}
    2 & 1\\
    1 & 2
    \end{array}
  \right).

