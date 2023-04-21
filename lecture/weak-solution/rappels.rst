Espaces de Hilbert : rappels
============================

.. prf:definition::

  Soit :math:`V` un :math:`\Rb-` espace vectoriel, alors l'application :math:`\PS{\cdot}{\cdot}\colon V\times V \to \Rb` est un produit scalaire si et seulement si elle vérifie, pour tout :math:`\xx,\yy,\zz\in V` et tout scalaire :math:`\alpha\in\Rb`:

  1. :math:`\PS{\xx}{\yy} = \PS{\yy}{\xx}`
  2. :math:`\PS{\xx + \yy}{\zz} = \PS{\xx}{\zz} + \PS{\yy}{\zz}`
  3. :math:`\PS{\alpha \xx}{\yy} = \alpha\PS{\xx}{\yy}`
  4. :math:`\PS{\xx}{\xx} \in \Rb^+`
  5. :math:`\PS{\xx}{\xx} = 0 \Longrightarrow \xx = 0`



.. prf:definition:: 

  Un :math:`\Rb-` espace vectoriel :math:`V` est dit pré-Hilbertien si il est muni d'un produit scalaire.



.. prf:definition:: 

  Soit :math:`V` un :math:`\Rb-` espace vectoriel, alors l'application :math:`\norm{\cdot}\colon V \to \Rb` est une norme si et seulement si elle vérifie, pour tout :math:`\xx,\yy\in V` et tout scalaire :math:`\alpha\in\Rb`:

  1. Séparation : :math:`\norm{\xx} = 0 \Longrightarrow x = 0`
  2. Absolue homogénéité  : :math:`\norm{\alpha \xx} = \abs{\alpha}\norm{\xx}`
  3. Inégalité triangulaire : :math:`\norm{\xx + \yy} \leq \norm{\xx} + \norm{\yy}`

.. prf:remark:: 
  
  Un produit scalaire induit une norme sur un espace de Hilbert :

  .. math:: \norm{\xx} := \sqrt{\PS{\xx}{\xx}}.


Nous rappelons l'inégalité de Cauchy Schwarz:

.. prf:proposition:: Inégalité de Cauchy Schwarz

  Pour tout :math:`\xx` et :math:`\yy` appartenant à un espace pré-Hilbertien :math:`V` :

  .. math:: \abs{\PS{\xx}{\yy}} \leq \norm{\xx}\norm{\yy}.



.. prf:definition:: 

  Un espace pré-Hilbertien :math:`V` est un espace de Hilbert si et seulement si il est complet pour la norme :math:`\norm{\cdot}` induite par son produit scalaire.

.. prf:definition:: 

  Soit :math:`V` un espace de Hilbert. L'application :math:`f:V\times V \to \Rb` est une forme bilinéaire sur :math:`V` si et seulement si, pour tout :math:`\xx,\yy, \zz` de :math:`V` et :math:`\alpha` de :math:`\Rb`:

  1. :math:`f(\xx, \yy + \alpha \zz) = f(\xx,\yy) + \alpha f(\xx,\zz)`
  2. :math:`f(\alpha \xx + \yy, \zz) = \alpha f(\xx,\zz) + f(\yy,\zz)`



.. prf:theorem:: Représentation de Riesz

  Soit :math:`V` un espace de Hilbert de produit scalaire :math:`\PS{\cdot}{\cdot}` et de norme induite :math:`\norm{\cdot}`. Pour toute forme anti-linéaire continue :math:`\ell`, il existe un unique :math:`w\in V` tel que
  
  .. math::  \ell(v) = \PS{w}{v}, \quad \forall v\in V.

  De plus, nous avons

  .. math::  \norm{w} = \sup_{v\in V\setminus\{0\}}\frac{\abs{\ell(v)}}{\norm{v}}.



.. prf:remark::

  Ce théorème montre que la forme :math:`\ell` peut être **représentée** par un vecteur :math:`w` qui est unique. Autrement dit, peu importe :math:`v`, la quantité :math:`\ell(v)` peut se calculer par la seule connaissance du vecteur :math:`w` et d'un "simple" produit scalaire.

