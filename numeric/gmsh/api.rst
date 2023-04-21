API GMSH
========

Déjà abordé dans `le tutoriel GMSH <https://bthierry.pages.math.cnrs.fr/tutorial/gmsh>`_, nous nous intéressons à l'API Python de GMSH.

Fonction de Forme
-----------------

Le but est d'afficher une fonction de forme :math:`\mathbb{P}^1-` Lagrange, c'est à dire une fonction :math:`\varphi_{IJ}` de :math:`V_h` qui vaut 0 sur tous les sommets :math:`J\neq I` du maillage sauf sur le sommet :math:`I`, pour lequelle la fonction prend la valeur 1 :

.. math:: \forall I,J = 0,\ldots, N_s-1,\qquad \varphi_I(\mathbf{s}_J) = \delta_{IJ}


.. exercise::

  À l'aide de l'API Python de GMSH :

  - Générez un carré unitaire avec un pas de maillage de 0.25
  - Appliquez des labels :code:`Physical`: un pour la surface et un pour son bord
  - Générez le maillage 2D
  - Construisez 3 `numpy array <https://numpy.org/>`_ :code:`Phi`, :code:`X` et :code:`Y` unidimensionnel et de taille le nombre de sommets :math:`N_s` du maillage tels que:

    - :code:`Phi` est le vecteur nul sauf en un coefficient où :code:`Phi[I] = 1` (choisissez le :code:`I`) 
    - :code:`X` et :code:`Y` sont respectivement les coordonnées x et y des points du maillage (voir ci-dessous)
  - Affichez le tout à l'aide de `Matplotlib et de la projection 3D <https://matplotlib.org/3.1.1/gallery/mplot3d/trisurf3d.html>`_


Pour obtenir les coordonnées des points d'un groupe :code:`Physical` donné, vous pouvez utilisez :code:`gmsh.model.mesh.getNodesForPhysicalGroup(dim, tag)` (voir `gmsh.py <https://gitlab.onelab.info/gmsh/gmsh/blob/master/api/gmsh.py>`_):


.. code-block:: python

  def getNodesForPhysicalGroup(dim, tag):
    """
    Get the nodes from all the elements belonging to the physical group of
                dimension `dim' and tag `tag'. `nodeTags' contains the node tags; `coord'
                is a vector of length 3 times the length of `nodeTags' that contains the x,
                y, z coordinates of the nodes, concatenated: [n1x, n1y, n1z, n2x, ...].

                Return `nodeTags', `coord'.
    """


.. prf:remark::

  - GMSH commence la numérotation des sommets à 1
  - La liste retournée par :code:`getNodesForPhysicalGroup` n'est pas triée


Interpolation :math:`\Pb^1`
---------------------------

Prenons une fonction f définie sur :math:`\Omega`. Une interpolation possible de f sur l'espace :math:`\mathbb{P}^1` est la fonction :math:`\Pi_hf` telle que :math:`\Pi_hf(\mathbf{s}) = f(\mathbf{s})` pour chaque sommet :math:`\mathbf{s}` du maillage.

.. exercise::

  Construisez l'interpollée :math:`\Pi_hf` de la fonction :math:`f(x,y) = \sin(\pi x)\sin(\pi y)`

