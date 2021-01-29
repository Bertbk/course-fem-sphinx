

Application au problème modèle
------------------------------

Considérons un ouvert polygonal connexe :math:`\Omega` et le problème suivant

.. math:: 

  \left\{
  \begin{array}{r c l l}
    -\Delta u + c u & = & f & (\Omega)\\
    \dn u & = & 0 & (\GammaN = \Gamma)
  \end{array}
  \right.

La formulation faible de problème s'écrit 

.. math:: 

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

Tentons d'appliquer le théorème de Lax-Milgram à cette formulation faible

1. :math:`\Ho` est un espace de Hilbert
2. :math:`\ell(\cdot)` est clairement linéaire (du fait de l'intégrale)
3. :math:`a(\cdot,\cdot)`  est bilinéaire, pour la même raison
4. Continuité de :math:`a(\cdot,\cdot)`

TODO: