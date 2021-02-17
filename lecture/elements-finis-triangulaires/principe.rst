Principe
========

Discrétisation de la formulation variationnelle
-----------------------------------------------

Pour le moment, nous supposerons :math:`\GammaD = \emptyset` et :math:`\gN = 0`. Autrement dit, la formulation faible s'écrit

.. math::  \left\{
  \begin{array}{l}
    \text{Trouver } u \in\Ho \text{ tel que }\\
    \displaystyle \int_{\Omega}\nabla u \cdot\nabla v+ c\int_{\Omega}uv = \int_{\Omega}fv  \underbrace{+  \int_{\GammaN} \gN v}_{=0}, \quad \forall v \in \Ho
  \end{array}
  \right.

Nous la réécrivons sous la forme compacte suivante :

.. math::

  \left\{
  \begin{array}{l}
    \text{Trouver } u \in\Ho \text{ tel que }\\
    \forall v \in \Ho, \quad a(u,v) =\ell(v)
  \end{array}
  \right.

où les formes bilinéaires :math:`a(\cdot,\cdot)` et linéaires :math:`\ell(\cdot)` sont définies par :

.. math::

  \begin{array}{r  c l}
    a \colon \Ho\times\Ho& \longrightarrow & \Rb\\
      (u,v) &\longmapsto&\displaystyle a(u,v) = \int_{\Omega}\nabla u \cdot\nabla v+ c\int_{\Omega}uv\\[0.2cm]
      \ell\colon\Ho&\longrightarrow&\Rb\\
      v & \longmapsto & \displaystyle \ell(v) =\int_{\Omega}fv %+  \int_{\GammaN} \gN v
  \end{array}  

Le principe de la méthode est d'approcher l'espace :math:`\Ho` par :math:`\Vh`. Cette méthode est appelé **Méthode de Galerkin** ou **Approximation interne**. Pour cela, modifions, dans la formulation faible, :math:`\Ho` par :math:`\Vh`:

.. math::
  :label: eq-fvsimple

  \left\{
  \begin{array}{l}
    \text{Trouver } \uh \in\Vh \text{ tel que }\\
    \displaystyle \forall \vh \in \Vh, \quad a(\uh,\vh) =\ell(\vh).
  \end{array}
  \right.

Si :math:`\vh\in\Ho` est "proche" de :math:`\Ho` alors on est en droit d'espérer que :math:`\uh` soit proche de :math:`u`. C'est le cas comme nous le montrons plus tard. En attendant, supposons que ça soit une bonne idée et regardons ce que cela nous apporte.

Système linéaire
----------------

L'espace :math:`\Vh` est de dimension finie et dispose d'une **base finie** : les fonctions de forme :math:`(\mphi_I)_{I=0,\ldots,\Ns-1}`. Autrement dit, comme :math:`a(\cdot,\cdot)` est bilinéaire et :math:`\ell(\cdot)` est linéaire (cela se vérifie aisément), la formulation faible discrétisée :eq:`eq-fvsimple` est équivalente à

.. math::

  \left\{
  \begin{array}{l}
    \text{Trouver } \uh \in\Vh \text{ tel que }\\
    \displaystyle \forall I=0,\ldots,\Ns-1 , \quad a(\uh,\mphi_I) =\ell(\mphi_I).
  \end{array}
  \right.

Nous pouvons aussi décomposer :math:`\uh` dans la base des fonctions de forme :

.. math::

  \uh = \sum_{J=0}^{\Ns-1} u_J \mphi_J,

avec :math:`u_J = \uh(\vertice_J)`. La formulation faible se réécrit alors 

.. math::

  \left\{
  \begin{array}{l}
    \text{Trouver } (u_J)_{J=0,\ldots,\Ns-1} \text{ tel que }\\
    \displaystyle \forall I=0,\ldots,\Ns-1 , \quad a\left(\sum_{J=0}^{\Ns-1} u_J \mphi_J,\mphi_I\right) =\ell(\mphi_I).
  \end{array}
  \right.

Comme :math:`a(\cdot,\cdot)` est bilinéaire, nous avons

.. math::

  a\left(\sum_{J=0}^{\Ns-1} u_J \mphi_J,\mphi_I\right) = \sum_{J=0}^{\Ns-1}  u_Ja\left( \mphi_J,\mphi_I\right).

Stockons maintenant les coefficients recherchés dans le vecteur :math:`\Uh = [u_0,\ldots,u_{\Ns-1}]^T`. Ce problème peut alors se réécrire tout simplement sous la forme d'un système linéaire :

.. math:: \Ahh\Uh = \Bh,
  :label: eq-systemFEM

où nous avons

.. math::

  \left\{\begin{aligned}
    \Ahh &= (\Ahh_{I,J})_{ 0\leq I,J\leq \Ns-1} = (a(\mphi_J, \mphi_I))_{ 0\leq I,J\leq \Ns-1}\\
    \Uh &=(\Uh_I)_{0\leq I \leq \Ns-1} = (u_I)_{0\leq I \leq \Ns-1}= (u_h(\vertice_I))_{0\leq I \leq \Ns-1}\\
    \Bh &=(\Bh_I)_{ 0\leq I\leq \Ns-1} = (\ell(\mphi_I))_{0\leq I\leq \Ns-1}
  \end{aligned}\right.

Ce système linéaire :eq:`eq-systemFEM` est de dimension :math:`\Ns`, le nombre de sommets du maillage.

.. proof:remark::

  Il en faut pas oublier que la matrice :math:`\Ahh` et le vecteur :math:`\Bh` dépendent du maillage considéré ! Il en va évidemment de même pour le vecteur d'iconnues :math:`\Uh`.