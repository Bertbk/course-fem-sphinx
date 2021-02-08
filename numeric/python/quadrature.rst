Quadratures
===========

Rappel
------

Certaines intégrales ne peuvent être calculées analytiquement et devront être approchées numériquement via des règles de quadrature. Prenons pour exemple d'une fonction :math:`f` quelconque mais connue, le second membre :math:`B` (un vecteur) sera alors de la forme suivante, où :math:`\xx=(x,y)`,

.. math::
  :label: eq-B

  \begin{aligned}
    B[I] & = \int_{\Omega} f(\mathbf{x}) \varphi_I(\mathbf{x})\;\mathrm{d}\mathbf{x}  = \sum_{p}\sum_{i} \int_{K_p} f(\mathbf{x}) \varphi_i^p(\mathbf{x})\;\mathrm{d}\mathbf{x}\\
    & = \sum_{p} \abs{\det(J_p)} \sum_{i} \int_{\hat{K}} f(\mathbf{x}(\xi,\eta)) \mphih_i(\xi,\eta)\;\mathrm{d}(\xi,\eta)\\
  & \approx \sum_{K_p} \abs{\det(J_p)} \sum_{i}\sum_m \omega_m f(\mathbf{x}(\xi_m, \eta_m)) \mphih_i(\xi_m, \eta_m)
  \end{aligned}

Les poids :math:`\omega_m` et les points de quadrature :math:`(\xi_m, \eta_m)` dépendent de la précision recherchée :ref:`comme expliqué dans le cours <sec-quadrature>`. Rappelons aussi que :math:`\mathbf{x}(\xi_m, \eta_m)` s'obtient par les fonctions d'interpolation géométrique, qui dans le cas d'éléments finis isoparamétriques, sont les mêmes que les fonctions éléments finis :math:`\mathbb{P}^1`, c'est à dire que pour :math:`\mathbf{x}` appartenant à un élément de sommets :math:`(\mathbf{s}_i)_i` :

.. math::  \mathbf{x}(\xi_m, \eta_m) = \sum_{i=1} \hat{\psi}_i(\xi_m, \eta_m)\mathbf{s}_i,


Les fonctions :math:`(\hat{\psi}_i)_i` sont égales au fonctions de forme :math:`\Pb^1-` Lagrange :math:`(\mphih_i)_i`. Cependant, les fonction :math:`(\hat{\psi}_i)_i` sont des fonctions d'interpolation *géométriques* tandis que les fonctions de forme :math:`(\hat{\varphi}_i)_i` sont des fonctions d'interpolation de la solution.

Méthodes et fonctions utiles
----------------------------

Pour chaque type d'élément, :code:`Triangle` ou :code:`Segment`, nous avons besoin de méthodes permettant d'obtenir les quantités suivantes: :

1. Les poids des points de quadrature
2. Les coordonnées paramétriques des points de quadrature
3. Les coordonnées physiques des points de quadrature
4. Les valeurs des fonctions de forme de référence :math:`\hat{\varphi}` sur des coordonnées paramétriques

Remarquez que les points 1, 2 ne dépendent que du type de l'élément considéré.

.. proof:exercise::

  Afin de bien compartimenter chaque fonctionnalité, nous proposons :

  - Ajouter aux classes :code:`Triangle` et :code:`Segment` la méthode :code:`def gaussPoint(self,order=2):` qui retourne, dans le format de votre choix, les poids, les coordonnées paramétriques et les coordonnées physiques des points de Gauss de l'élement considéré et pour une précision :code:`order`. Vous aurez sans doute besoin de méthodes intermédiaires pour calculer, par exemple les :math:`\hat{\psi}_i(\xi,\eta)`.
  - Ajouter une fonction :code:`def phiRef(element, i:int, param:[float]):` qui calcule :math:`\hat{\varphi}_i(\xi,\eta)` sur un élément :code:`Segment` ou :code:`Triangle`. L'argument :code:`param` est une liste des coordonnées paramétriques (:math:`(\xi,\eta)` pour un triangle, :math:`s` pour un segment))


Intégrale
---------

Construisez maintenant une fonction de prototype suivant

.. code-block:: python

  def Integrale(msh:Mesh, dim:int, physical_tag:int, f, B:np.array, order=2):

Cette fonction calcul l'intégrale :math:`\int f \varphi_I` sur le domaine de tag physique :code:`physical_tag` et de dimension :code:`dim`. Le résultat est alors **ajouté** dans :code:`B[I]` (voir :eq:`eq-B`). L'argument :code:`f` sera une fonction décrite par l'utilisatrice/utilisateur, elle prendra 2 arguments, :code:`x` et :code:`y` et retournera un scalaire correspondant à :math:`f(x,y)`.