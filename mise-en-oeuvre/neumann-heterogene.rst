Conditions de Neumann hétérogène
================================

Rajoutons maintenant la condition de Neumann hétérogène à notre problème (\ie :math:`\gN \neq 0`) :

.. math::

  \left\{ 
    \begin{array}{r c l l}
      -\Delta u + u &=& f & (\Omega),\\
      \dn u & = & g & (\GammaN).
    \end{array}
    \right.
  :label:eq-dnNonH

Après multiplication par des fonctions test et intégration par partie, nous obtenons la formulation variationnelle

.. math::

  \int_{\Omega}\nabla u(x) \cdot \nabla v(x) \diff x +
  \int_{\Omega}  u(x) v(x) \diff x
  -\int_{\partial\Omega} \dn u(x)v(x) \diff s(x) =
  \int_{\Omega} f(x)v(x) \diff x.

En utilisant la condition :math:`\dn u = \gN` sur :math:`\GammaN`, nous obtenons la formulation variationnelle suivante :

.. math::

  \left\{\begin{array}{l}
    \text{Trouver }u\in\Ho\text{ tel que}\\
    \forall v \in\Ho,\quad a(u,v) = \ell(v),
  \end{array}\right.
  :label:fv-dnNonH

avec

.. math::

  \begin{aligned}
    a(u,v) &:= \dsp\int_{\Omega}\nabla u(x) \cdot \nabla v(x) \diff x +
    \int_{\Omega}  u(x) v(x) \diff x\\
    \ell(v) &:= \dsp\int_{\partial\Omega} g(x)v(x) \diff s(x)  + \int_{\Omega} f(x)v(x) \diff x.
  \end{aligned}

Nous discrétisons la formulation faible \eqref{fv:dnNonH} en remplaçant formellement :math:`\Ho` par :math:`\Vh` pour obtenir

.. math::

  \left\{\begin{array}{l}
    \text{Trouver }\uh\in\Vh\text{ tel que}\\
    \forall \vh \in\Ho,\quad a(\uh,\vh) = \ell(\vh),
  \end{array}\right.

Nous appliquons la méthode vue précédemment pour obtenir un système linéaire équivalent à \eqref{TODO:} :

.. math::  \Ahh\Uh = \Bh.

Les coefficients de la matrice :math:`\Ahh` et du vecteur :math:`\Bh` sont donnés par

.. math::

  \begin{aligned}
    \Ahh&=(\Ahh[I][J]), &\Ahh[I][J] &= a(\mphi_J,\mphi_J) = \int_{\Omega}\nabla \mphi_J\cdot\nabla\mphi_I + c\int_{\Omega}\mphi_J\mphi_I\\
    \Bh &=(\Bh[I])_I, &\Bh[I] &= \ell(\mphi_I) = \int_{\Omega}f\mphi_I \underbrace{+ \int_{\GammaN}\gN\mphi_I}_{\text{Nouveau !}}
  \end{aligned}

Au final, seule le membre de droite est modifié par rapport au paragraphe \ref{}, avec l'ajout de la condition de Neumann sur :math:`\GammaN`. Autrement dit, la matrice :math:`\Ahh` est identique et il nous suffit de savoir calculer :math:`\int_{\GammaN}\gN\mphi_I` pour obtenir le second membre : pour cela, nous utilisons une règle de quadrature sur des segments. La technique est la même que pour le calcul de :math:`\int_{\Omega}f\mphi_I`. Décomposons :math:`\GammaN` en :math:`N_{\GammaN}` segments (qui sont aussi des arêtes de triangles !), nous pouvons alors décomposer :math:`\Bh` comme une somme de contributions élémentaires sur les triangles et les segments. 

.. math::  \Bh = \sum_{p=0}^{\Nt-1} \sum_{i=0}^2 \int_{\tri_p}f\mphi_i^p + \sum_{q=0}^{N_{\GammaN}}

Voici quelques formules de quadrature sur un segment :math:`[\vertice_{0}^{p}, \vertice_{1}^{p}]` avec le degré de précision, c'est à dire que la formule est exacte si :math:`g` est un polynôme de degré égal ou inférieur. Nous notons :math:`\abs{\sigma} = \norm{\vertice_{0}^{p} - \vertice_{1}^{p}}` la taille du segment et :math:`\vertice_{01}^{p} = \frac{\vertice_{0}^{p} + \vertice_{1}^{p}}{2}` le milieu du segment:


+------------------------------------+--------------------+------------------------------------------------------------------------------------------------------------------+
| Nom                                | Degré de Précision |  Formule                                                                                                         |
+====================================+====================+==================================================================================================================+
| Point du milieu                    |  1                 | :math:`\dsp g(\vertice_{01}^{p})`                                                                                |
+------------------------------------+--------------------+------------------------------------------------------------------------------------------------------------------+
|Trapèze                             |1                   | :math:`\dsp\frac{\abs{\sigma}}{2}\left(g(\vertice_{0}^{p}) + g(\vertice_{1}^{p})\right)`                         |
+------------------------------------+--------------------+------------------------------------------------------------------------------------------------------------------+
|1/3 Simpson                         | 2                  | :math:`\dsp\frac{\abs{\sigma}}{6}\left(g(\vertice_{0}^{p}) + 4g(\vertice_{01}^{p}) + g(\vertice_{1}^{p})\right)` |
+------------------------------------+--------------------+------------------------------------------------------------------------------------------------------------------+


