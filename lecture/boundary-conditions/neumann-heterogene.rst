.. _sec-neumann-heterogene:

Conditions de Neumann hétérogène
================================

Théorie
-------

Rajoutons maintenant la condition de Neumann hétérogène à notre problème (:math:`\gN \neq 0`) :

.. math::

  \left\{ 
    \begin{array}{r c l l}
      -\Delta u + u &=& f & (\Omega),\\
      \dn u & = & \gN & (\Gamma := \partial\Omega).
    \end{array}
    \right.


Après multiplication par des fonctions test et intégration par partie, nous obtenons la formulation variationnelle

.. math:: \int_{\Omega}\nabla u \cdot \nabla v + \int_{\Omega}  u v  -\int_{\partial\Omega = \Gamma} (\dn u)v =  \int_{\Omega} f v.

En utilisant la condition :math:`\dn u = \gN` sur :math:`\Gamma`, nous obtenons la formulation variationnelle suivante :

.. math::
  :label: fv-dnNonH

  \left\{\begin{array}{l}
    \text{Trouver }u\in\Ho\text{ tel que}\\
    \forall v \in\Ho,\quad a(u,v) = \ell(v),
  \end{array}\right.


avec

.. math::

  \begin{aligned}
    a(u,v) &:= \int_{\Omega}\nabla u \cdot \nabla v +
    \int_{\Omega}  u v \\
    \ell(v) &:= \int_{\Gamma} \gN v    + \int_{\Omega} f v.
  \end{aligned}

Pour pouvoir appliquer le Théorème de Lax-Milgram, nous savons par le cas de Neumann homogène que l'application :math:`a(\cdot,\cdot)` est continue et coercive.  Rien de neuf sous le soleil me direz-vous ? Oui mais non :

- Nous ne savons pas si :math:`\ell(\cdot)` est continue
- Pire encore,  est-ce que le terme :math:`\int_{\Gamma} g(\xx)v(\xx) \diff s(\xx)` a un sens quand :math:`v` est dans :math:`\Ho` ?


Nous n'avons en effet pas (encore) donné de sens à la trace (= la "restriction") sur :math:`\Gamma` d'une fonction de :math:`\Ho`, c'est-à-dire à :math:`v|_{\Gamma}`. C'est l'objet du théorème ci-dessous (admis).

.. _thm-trace:

.. proof:theorem:: Continuité de la Trace (admis)

  Soit :math:`\Gamma\subset\partial\Omega` une partie du bord de mesure non nulle au sens de la mesure de surface. Alors il existe une unique application :math:`\gamma_{\Gamma}\colon\Ho\to L^2(\Gamma)` qui est continue au sens de :math:`\normH{\cdot}` :

  .. math:: \exists C>0 \text{ tel que } \forall v \in\Ho, \; \norm{\gamma_{\Gamma}(v)}_{L^2(\partial\Omega)} \leq C\normH{v}.

  Cette application est de plus caractérisée par

  .. math:: \forall\varphi\in \Cscr^1(\overline{\Omega}),\qquad \gamma_{\Gamma}(\varphi) = \varphi|_{\Gamma}.


Ce théorème nous permet de montrer que la forme :math:`\ell` a un sens (chaque quantité existe) et est bien continue puisque, pour tout :math:`v` de :math:`\Ho` :

.. math:: 
  
  \begin{aligned}
    \abs{\ell(v)}  &\leq \abs{\int_{\Omega} f(\xx) v(\xx)\diff\xx} + \abs{\int_{\partial\Omega} \gN(\xx)v(\xx)\diff\xx} & \text{Inégalité Triangulaire}\\
    &\leq   \abs{\int_{\Omega} f(\xx) v(\xx)\diff\xx}+ \abs{\int_{\partial\Omega} \gN(\xx) \gamma_{\partial\Omega}(v(\xx))} &\text{Réécriture}\\
    &\leq \normL{f}\normL{v} + \norm{g}_{L^2(\partial\Omega)}\norm{\gamma_{\partial\Omega}(v)}_{L^2(\partial\Omega)} &\text{Cauchy-Schwarz}\\
    &\leq \left(\normL{f} + C\norm{g}_{L^2(\partial\Omega)}\right)\normH{v} & \text{Cont. Trace}.
  \end{aligned}


.. _sec-quad-1D:

Implémentation dans le cas :math:`\Pb^1`
----------------------------------------

Nous discrétisons la formulation faible :eq:`fv-dnNonH` en remplaçant formellement :math:`\Ho` par :math:`\Vh` pour obtenir

.. math::
  :label: eq-fvdnNonH

  \left\{\begin{array}{l}
    \text{Trouver }\uh\in\Vh\text{ tel que}\\
    \forall \vh \in\Ho,\quad a(\uh,\vh) = \ell(\vh),
  \end{array}\right.

Nous appliquons la méthode vue précédemment pour obtenir un système linéaire équivalent à :eq:`eq-fvdnNonH` :

.. math::  A\Uh = B.

Les coefficients de la matrice :math:`A` et du vecteur :math:`B` sont donnés par

.. math::

  \begin{aligned}
    A&=(A_{I,J})_{I,J}, &A_{I,J} &= a(\mphi_J,\mphi_J) = \int_{\Omega}\nabla \mphi_J\cdot\nabla\mphi_I + \int_{\Omega}\mphi_J\mphi_I\\
    B &=(B_I)_I, &B_I &= \ell(\mphi_I) = \int_{\Omega}f\mphi_I \underbrace{+ \int_{\Gamma}\gN\mphi_I}_{\text{Nouveau !}}
  \end{aligned}
,
Au final, seule le membre de droite est modifié par rapport au cas de la condition de Neumann homogène. Autrement dit, la matrice :math:`A` est identique et il nous suffit de savoir calculer :math:`\int_{\Gamma}\gN\mphi_I` pour obtenir le second membre : pour cela, nous utilisons une règle de quadrature sur des segments. La technique est la même que pour le calcul de :math:`\int_{\Omega}f\mphi_I`. 

Décomposons :math:`\Gamma` en :math:`N_{\Gamma}` segments (qui sont aussi des arêtes de triangles !) :math:`\sigma_q`, :math:`q=1,\ldots,N_{\Gamma}`. Chaque segment a deux sommets indicés :math:`[\vertice_1^{\sigma_q}, \vertice_2^{\sigma_q}]`. Nous notons :math:`\mphi_i^{\sigma_q} = \mphi_I|_{\sigma_q}` la restriction de la fonction de forme :math:`\mphi_I` au segment :math:`q`, tel que :math:`\vertice_i^{\sigma_q} = \vertice_I`. Nous pouvons alors décomposer :math:`B` comme une somme de contributions élémentaires sur les triangles et les segments. 

.. math::  B = \sum_{p=1}^{\Nt} \sum_{i=1}^3 \int_{\tri_p}f\mphi_i^p + \sum_{q=1}^{N_{\Gamma}}\sum_{i=1}^2 \int_{\sigma_q} \gN{}\mphi_i^{\sigma_q}.

Nous savons comment approcher la quantité de gauche avec une formule de quadrature adaptée. Le terme de droite s'approche lui aussi avec une formule de quadrature 1D, par exemple la formule "1/3 Simpson", qui est exacte pour des polynômes de degré 2. Nous notons :math:`\abs{\sigma} = \norm{{}\vertice_1^{\sigma_q} - \vertice_2^{\sigma_q}}` la taille du segment et :math:`\vertice_{12} = \frac{\vertice_1^{\sigma_q} + \vertice_2^{\sigma_q}}{2}` le milieu du segment, alors la formule est la suivante :


.. math:: \int_{\sigma} g \approx \frac{\abs{\sigma}}{6}\left(g(\vertice_1^{\sigma_q}) + 4g(\vertice_{12}^{\sigma_q}) + g(\vertice_{2}^{\sigma_q})\right)

