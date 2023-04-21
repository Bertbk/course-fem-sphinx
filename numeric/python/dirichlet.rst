Conditions de Dirichlet
=======================

Pour prendre en compte les éventuelles condition de Dirichlet, nous avons besoin d'une fonction de prototype suivant

.. code-block:: python

  def Dirichlet(msh, dim, physical_tag, g, triplets, B):

Cette fonction prend comme argument le :code:`Triplets triplets` et le vecteur :code:`B` du système linéaire et les modifie pour prendre en compte la condition de dirichlet :math:`u=`:code:`g` sur le domaine de dimension :code:`dim` et de tag physique :code:`physical_tag`. La technique utilisée pour forcer cette condition est celle vue en cours.

Pour cela, nous parcourons les noeuds :code:`I` du domaine de Dirichlet. Puis, dans la liste des indices ligne de :code:`triplets`, dès qu'un occurence à :code:`I` est obtenu, la valeur de ce triplet est mise à :math:`0`.
Il ne faut pas oublier, à la fin, d'ajouter un triplet :code:`(I,I,1)` correspondant au terme diagonal et de modifier le coefficient :code:`B[I] = g(x,y)`.

.. prf:remark::

  Cette technique n'est peut être pas la plus optimale ! Mais elle a le mérite de fonctionner...
