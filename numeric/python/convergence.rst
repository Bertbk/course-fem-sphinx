Convergence
===========

Soit le problème suivant :

.. math::
  :label: eq-problErr

  \left\{\begin{array}{r c l l}
  -\Delta u + u &=& f & (\Omega)\\
  u &=&0&(\partial\Omega)
  \end{array}\right.

:math:`\Omega` est le carré unité :math:`]0,1[\times]0,1[` et :math:`f(x,y) = (1+2\pi^2)\sin(\pi x)\sin(\pi y)`.


.. proof:exercise::

  1. **Résolvez** ce problème :eq:`eq-problErr` et afficher la solution
  2. **Pour diférents pas de maillage**, calculez l'erreur en norme :math:`L^2` entre la solution exacte et la solution approchée pour le problème :eq:`eq-problErr`. 
  3. **Affichez** la courbe de l'erreur en fonction de :math:`h` en échelle log-log. 
  4. **Calculez** la pente de la courbe et déduisez-en la vitesse de convergence par rapport au pas de maillage (:math:`h`). Sauvegardez par ailleurs une copie de la courbe en format données (JSON ou autre) ou image (:code:`PNG` par exemple, pas de :code:`JPG` nous ne sommes pas des sauvages !). 

