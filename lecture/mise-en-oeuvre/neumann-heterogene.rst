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


Après multiplication par des fonctions test et intégration par partie, nous obtenons la formulation variationnelle

.. math:: \int_{\Omega}\nabla u \cdot \nabla v + \int_{\Omega}  u v  -\int_{\partial\Omega} (\dn u)v =  \int_{\Omega} f v.

En utilisant la condition :math:`\dn u = \gN` sur :math:`\GammaN`, nous obtenons la formulation variationnelle suivante :

.. math:: 
  :label: fv-dnNonH

  \left\{\begin{array}{l}
    \text{Trouver }u\in\Ho\text{ tel que}\\
    \forall v \in\Ho,\quad a(u,v) = \ell(v),
  \end{array}\right.


avec

.. math::

  \begin{aligned}
    a(u,v) &:= \displaystyle\int_{\Omega}\nabla u \cdot \nabla v +
    \int_{\Omega}  u v \\
    \ell(v) &:= \displaystyle\int_{\partial\Omega} g v    + \int_{\Omega} f v.
  \end{aligned}

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
    A&=(A_{I,J})_{I,J}, &A_{I,J} &= a(\mphi_J,\mphi_J) = \int_{\Omega}\nabla \mphi_J\cdot\nabla\mphi_I + c\int_{\Omega}\mphi_J\mphi_I\\
    B &=(B_I)_I, &B_I &= \ell(\mphi_I) = \int_{\Omega}f\mphi_I \underbrace{+ \int_{\GammaN}\gN\mphi_I}_{\text{Nouveau !}}
  \end{aligned}

Au final, seule le membre de droite est modifié par rapport à la section précédente par l'ajout de la condition de Neumann sur :math:`\GammaN`. Autrement dit, la matrice :math:`A` est identique et il nous suffit de savoir calculer :math:`\int_{\GammaN}\gN\mphi_I` pour obtenir le second membre : pour cela, nous utilisons une règle de quadrature sur des segments. La technique est la même que pour le calcul de :math:`\int_{\Omega}f\mphi_I`. Décomposons :math:`\GammaN` en :math:`N_{\GammaN}` segments (qui sont aussi des arêtes de triangles !) :math:`\sigma^q`, :math:`q=0,\ldots,N_{\GammaN}-1`. Chaque segment a deux sommets indicés :math:`[{}^q\vertice_0, {}^q\vertice_1]`. Nous notons :math:`{}^q\mphi_i = \mphi_I|_{\sigma_q}` la restriction de la fonction de forme :math:`\mphi_I` au segment :math:`q`, tel que :math:`{}^q\vertice_i = \vertice_I`. Nous pouvons alors décomposer :math:`B` comme une somme de contributions élémentaires sur les triangles et les segments. 

.. math::  B = \sum_{p=0}^{\Nt-1} \sum_{i=0}^2 \int_{\tri_p}f\mphi_i^p + \sum_{q=0}^{N_{\GammaN}}\sum_{i=0}^2 \int_{\sigma_q} \gN{}^q\mphi_i.

Voici quelques formules de quadrature sur un segment :math:`[{}^q\vertice_0, {}^q\vertice_1]` avec le degré de précision, c'est à dire que la formule est exacte si :math:`g` est un polynôme de degré égal ou inférieur. Nous notons :math:`\abs{\sigma} = \norm{{}^q\vertice_0 - {}^q\vertice_1}` la taille du segment et :math:`{}^q\vertice_{01} = \frac{{}^q\vertice_0 + {}^q\vertice_0}{2}` le milieu du segment:


+------------------------------------+--------------------+---------------------------------------------------------------------------------------------------------------------------+
| Nom                                | Degré de Précision |  Formule                                                                                                                  |
+====================================+====================+===========================================================================================================================+
| Point du milieu                    |  1                 | :math:`\displaystyle g({}^q\vertice_{01})`                                                                                |
+------------------------------------+--------------------+---------------------------------------------------------------------------------------------------------------------------+
|Trapèze                             |1                   | :math:`\displaystyle\frac{\abs{\sigma}}{2}\left(g({}^q\vertice_{0}) + g({}^q\vertice_{1})\right)`                         |
+------------------------------------+--------------------+---------------------------------------------------------------------------------------------------------------------------+
|1/3 Simpson                         | 2                  | :math:`\displaystyle\frac{\abs{\sigma}}{6}\left(g({}^q\vertice_{0}) + 4g({}^q\vertice_{01}) + g({}^q\vertice_{1})\right)` |
+------------------------------------+--------------------+---------------------------------------------------------------------------------------------------------------------------+


