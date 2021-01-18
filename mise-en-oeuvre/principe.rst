Principe
========

Discrétisation de la formulation variationnelle
-----------------------------------------------

Pour le moment, nous supposerons :math:`\GammaD = \emptyset` et :math:`\gN = 0`. Autrement dit, la formulation faible s'écrit

.. math:

  \left\{
  \begin{array}{l}
    \text{Trouver } u \in\Ho \text{ tel que }\\
    \dsp \int_{\Omega}\nabla u \cdot\nabla v+ c\int_{\Omega}uv = \int_{\Omega}fv  \underbrace{+  \int_{\GammaN} \gN v}_{=0}, \quad \forall v \in \Ho
  \end{array}
  \right.

Nous la réécrivons sous la forme compacte suivante :

.. math:

  \left\{
  \begin{array}{l}
    \text{Trouver } u \in\Ho \text{ tel que }\\
    \dsp \forall v \in \Ho, \quad a(u,v) =\ell(v)
  \end{array}
  \right.

où les formes bilinéaires :math:`a(\cdot,\cdot)` et linéaires :math:`\ell(\cdot)` sont définies par :

.. math:

  \begin{array}{r  c l}
    a \colon \Ho\times\Ho& \longrightarrow & \Rb\\
      (u,v) &\longmapsto&\dsp a(u,v) = \int_{\Omega}\nabla u \cdot\nabla v+ c\int_{\Omega}uv\\[0.2cm]
      \ell\colon\Ho&\longrightarrow&\Rb\\
      v & \longmapsto & \dsp \ell(v) =\int_{\Omega}fv %+  \int_{\GammaN} \gN v
  \end{array}  

Le principe de la méthode est d'approcher l'espace :math:`\Ho` par :math:`\Vh`. Cette méthode est appelé *Méthode de Galerkin* ou *Approximation interne*. Pour cela, modifions, dans la formulation faible, :math:`\Ho` par :math:`\Vh`:

.. math:

  \left\{
  \begin{array}{l}
    \text{Trouver } \uh \in\Vh \text{ tel que }\\
    \dsp \forall \vh \in \Vh, \quad a(\uh,\vh) =\ell(\vh).
  \end{array}
  \right.

Pourquoi diable remplacer :math:`\Ho` par :math:`\Vh` ? La réponse juste après !

Système linéaire
----------------

L'espace :math:`\Vh` est de dimension finie et dispose d'une base : les fonctions de forme :math:`(\mphi[I])_{I=0,\ldots,\Ns-1}`. Autrement dit, la formulation faible discrétisée est équivalente à

.. math:

  \left\{
  \begin{array}{l}
    \text{Trouver } \uh \in\Vh \text{ tel que }\\
    \dsp \forall I=0,\ldots,\Ns-1 , \quad a(\uh,\mphi[I]) =\ell(\mphi[I]).
  \end{array}
  \right.

D'un autre côté, nous pouvons aussi écrire :math:`\uh` dans la base des fonctions de forme :

.. math:

  \uh = \sum_{J=0}^{\Ns-1} u_J \mphi[J],

avec :math:`u_J = \uh(\vertice[J])` et la formulation faible se réécrit alors 

.. math:

  \left\{
  \begin{array}{l}
    \text{Trouver } (u_J)_{J=0,\ldots,\Ns-1} \text{ tel que }\\
    \dsp \forall I=0,\ldots,\Ns-1 , \quad a\left(\sum_{J=0}^{\Ns-1} u_J \mphi[J],\mphi[I]\right) =\ell(\mphi[I]).
  \end{array}
  \right.

Comme :math:`a(\cdot,\cdot)` est bilinéaire\footnote{Vous pouvez le vérifier aisément}, nous avons

.. math:

  a\left(\sum_{J=0}^{\Ns-1} u_J \mphi[J],\mphi[I]\right) = \sum_{J=0}^{\Ns-1}  u_Ja\left( \mphi[J],\mphi[I]\right).

Notons maintenant :math:`\Uh = [u_0,\ldots,u_{\Ns-1}]^T` les coefficients recherchés, alors ce problème peut se réécrire tout simplement sous la forme d'un système linéaire :

.. math:

  \Ahh\Uh = \Bh,
  :label:eq-systemFEM

où nous avons

.. math:

  \begin{aligned}
    \Ahh &= (\Ahh[I][J])_{ 0\leq I,J\leq \Ns-1} = (a(\mphi[J], \mphi[I]))_{ 0\leq I,J\leq \Ns-1}\\
    \Uh &=(\Uh[I])_{0\leq I \leq \Ns-1}\\
    \Bh &=(\Bh[I])_{ 0\leq I\leq \Ns-1} = (\ell(\mphi[I]))_{0\leq I\leq \Ns-1}
  \end{aligned}

Ce système linéaire est de dimension :math:`\Ns`, le nombre de sommets du maillage. Dans la suite et pour simplifier, nous nous affranchirons de l'indice :math:`h` sur les termes du système linéaire \eqref{eq:systemFEM}.