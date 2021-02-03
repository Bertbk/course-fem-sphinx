Résolution et Analyse
=====================

Problème de référence
---------------------

Résumons ici l'utilisation de notre programme éléments finis sur le problème suivant :

.. math::
  :label: eq-problErr

  \left\{
  \begin{array}{r c l l}
  -\Delta u  + u & = & f & (\Omega)\\
  u & = & 0 & (\partial \Omega)
  \end{array}
  \right.

La formulation variationnelle est donnée par

.. math::

  \left\{
  \begin{array}{l}
  \text{Trouver }u\in H^1_0(\Omega) \text{ tel que }\\
  \displaystyle \forall v \in H^1_0(\Omega), \qquad \int_{\Omega} \nabla u\cdot\nabla v + \int_{\Omega} uv = \int_{\Omega}fv
  \end{array}
  \right.

Pour simplifier nous prenons :math:`\Omega = ]0,1[\times]0,1[` le carré unitaire et :math:`f(x,y) = (1+2\pi^2)\sin(\pi x)\sin(\pi y)`
de sorte que la solution exacte est connue et vaut

.. math:: u(x, y) = f(x, y).

.. figure:: /img/numeric/uref.png
  :figwidth: 100%
  :width: 75%
  :alt: Exemple de domaine de calcul avec sa normal unitaire sortante
  :align: center

  Solution

Résolution
----------

Dans notre programme, cela reviendra à écrire quelque chose comme

.. code-block:: python

  #import ...

  #Données
  def g(x,y):
    return np.sin(np.pi*x)*np.sin(np.pi*y)
  def f(x,y):
    return g(x,y)*(2*np.pi*np.pi +1 )
  def diri(x,y):
    return 0.
  #Maillage
  msh = geo.mesher("mesh.msh")
  # Triplets
  t = common.Triplets()
  fem_p1.Mass(msh, 2,10, t)
  fem_p1.Stiffness(msh, 2,10, t)
  b = np.zeros((msh.Npts,))
  fem_p1.Integral(msh, 2, 10, f, b, 2)
  fem_p1.Dirichlet(msh, t, b, 1, 1, diri)
  # Résolution
  A = (sparse.coo_matrix(t.data)).tocsr()
  U = sparse.linalg.spsolve(A, b)

  # Visualisation
  x= [pt.x for pt in msh.points]
  y= [pt.y for pt in msh.points]
  connectivity=[]
  for tri in msh.triangles:
    connectivity.append([ p.id for p in tri.p]) 

  plt.tricontourf(x, y, connectivity, U, 12)
  plt.colorbar()
  plt.show()

  ### U de référence
  Uref = np.zeros((msh.Npts,))
  for pt in msh.points:
    I = int(pt.id)
    Uref[I] = g(pt.x, pt.y)
  plt.tricontourf(x, y, connectivity, Uref, 12)
  plt.colorbar()
  plt.show()

Convergence
-----------


.. proof:exercise::

  1. **Pour diférents pas de maillage**, calculez l'erreur en norme :math:`L^2` entre la solution exacte et la solution approchée pour le problème :eq:`eq-problErr`. 
  2. **Affichez** la courbe de l'erreur en fonction de :math:`h` en échelle log-log. 
  3. **Calculez** la pente de la courbe et déduisez-en la vitesse de convergence par rapport au pas de maillage (:math:`h`). Sauvegardez par ailleurs une copie de la courbe en format données (JSON ou autre) ou image (:code:`PNG` par exemple, pas de :code:`JPG` nous ne sommes pas des sauvages !). 

