

Problème modèle
===============

Domaine Physique
----------------

.. only:: latex

  .. figure:: /_static/normal/normal.png
    :width: 50 %
  
    Exemple de domaine de calcul avec sa normal unitaire sortante

.. only:: html

  .. figure:: /_static/normal/normal.png
    :scale: 50 %
    :alt: Normal unitaire sortante
    :align: center

    Exemple de domaine de calcul avec sa normal unitaire sortante

Dans ce cours, nous considérons un ouvert polygonal :math:`\Omega` de :math:`\Rb^d`, :math:`d=2,3`. Sur chaque segment du bord :math:`\Gamma := \partial\Omega` du domaine, on définit le vecteur unitaire normale :math:`\nn` sortant à :math:`\Omega`. Nous noterons que ce vecteur n'existe pas aux intersections. Le domaine :math:`\Omega` est supposé ne pas comporter de fissure ni de point de rebroussement. Son bord est divisé en deux parties distinctes: :math:`\GammaD` et :math:`\GammaN`, potentiellement non connexe mais d'intersection vide: :math:`\Gamma = \overline{\GammaD}\cup\overline{\GammaN}` et :math:`\GammaD\cap\GammaN=\emptyset`. Selon la partie du bord, une condition sera imposée à la solution :


* Sur :math:`\GammaD` : *condition de Dirichlet*, c'est à dire que la valeur de la solution y est imposée (\eg :math:`u = 0`). En mécanique on parlerait du déplacement.
* Sur :math:`\GammaN` : *condition de Neumann*, c'est à dire que le flux de la solution y est imposée (\eg :math:`\dn u = 0`).  En mécanique on parlerait de la force normale.

.. proof:remark::

  En général, on préfère travailler dans un premier temps avec des ouverts \emph{réguliers}, de classe au moins :math:`\Ccal^1`. Un tel ouvert présente l'avantage de pouvoir clairement définir le vecteur unitaire normale :math:`\nn` sortant à :math:`\Omega` cependant, après maillage, on se retrouve avec \ldots un polygone ! Alors plutôt que de travailler dans un domaine régulier pour après le casser en (petits) morceaux, nous préférons ici mettre l'accent sur les algorithmes et la mise en oeuvre de la méthode que les spécificités mathématiques.

