Gestion du maillage
===================

Une classe par élément
----------------------

Nous proposons de construire 3 classes : :code:`Point`, :code:`Segment` et :code:`Triangle` représentant un élément de type point, segment et triangle. La première étape consiste à transcrire les informations du maillage dans notre structure de données. Nous pouvons aussi ne pas passer par cette étape et n'utiliser que GMSH, cependant, cela nous donnera un meilleur contrôle par la suite.


La classe :code:`Point` contient les coordonnées du point et un identifiant (0,1,2,3, ...), son indice globale, qui correspondra en P1 à la ligne dans la matrice du degré de liberté (DOF). Les classes :code:`Segment` et :code:`Triangle` ont pour paramètres :

- Un identifiant (0,1,2,3...)
- Une liste orientée de :code:`Point` qui le définissent
- Un tag :code:`Physical` (ou -1 sinon)

L'identifiant n'a pas besoin d'être le même que dans GMSH, il est même plus logique que les identifiants soient consécutifs et incrémenté à chaque nouvelle instance (0, 1, 2, ...). Le tag :code:`Physical` doit en revanche être le même que GMSH pour éviter toute confusion. Vous êtes évidemment libre d'ajouter des paramètres et des méthodes à ces classes ! 

Par ailleurs, les 2 classes d'élément :code:`Segment` et :code:`Triangle`, disposeront au moins des méthodes suivantes :

- :code:`area()` : calcule l'aire de l'élément (pour un segment, sa taille ; peut être stockée dans un paramètre et être calculé une fois pour toute)
- :code:`jac()` : calcule son jacobien (son aire pour un segment, 2 fois l'aire pour un triangle)



Une classe pour les gouverner toutes...
---------------------------------------

Il peut être assez malin de construire une classe :code:`Mesh` qui représente le maillage et permettra d'effectuer des recherches d'éléments. Cette classe aura pour paramètre trois listes : une liste de :code:`Point`, une de :code:`Segment` et une de :code:`Triangle`. De plus, nous lui ajoutons deux méthodes :

- :code:`Mesh.getElements(dim, physical_tag)` : retourne une liste de tous les éléments ayant la dimension :code:`dim` (=1 pour segment, 2 pour triangle) et le tag physique :code:`physical_tag`
- :code:`Mesh.getPoints(dim, physical_tag)` : retourne uniquement les points du domaine de dimension :code:`dim` et de label physique :code:`physical_tag`

...Et dans les ténébres les lier (à GMSH)
-----------------------------------------

Le maillage étant construit avec GMSH, il s'agit maintenant de convertir les données issues de GMSH dans notre structure. Nous supposons ici que le maillage est déjà chargé en mémoire, soit parce qu'il vient d'être construit par GMSH (via :code:`gmsh.model.mesh`) soit parce qu'il a été lu sur disque (via :code:`gmsh.merge("fichier.msh")`). Nous proposons que le constructeur de :code:`Mesh` soit vide (ne construit rien) et que l'instance de :code:`Mesh` soit construite à l'aide d'une méthode :code:`GmshToMesh(string filename)`, qui lit les données GMSH et construit les :code:`Point`, :code:`Segment` et :code:`Triangle` et les ajoute dans les listes correspondent à :code:`Mesh`. L'argument :code:`filename` peut être optionnel si le maillage est déjà construit.



.. raw:: html

  <div class="mermaid" style="text-align:center;">
  classDiagram
      class Mesh{
            +Point[ ] points
            +Segment[ ] segments
            +Triangles[ ] triangles
            +int Npts, Nseg, Ntri
            __init__(self)
            __str__(self)
            GmshToMesh(self, filename)
            getElements(self, dim, physical_tag)
            getPoints(self, dim, physical_tag)
        }
        class Point{
            +int id
            +float x, y
            -static int N
            -static name="Point"
            __init__(self, x, y)
        }
        class Segment{
            int id
            int physical_tag
            Point[ ] p
            -static int N
            -static name="Segment"
            __init__(self, Point[], id)
            area(self)
            jac(self)
        }
        class Triangle{
            int id
            int physical_tag
            Point[ ] p
            -static int N
            -static name="Triangle"
            __init__(self, Point[], id)
            area(self)
            jac(self)
        }
        Point <.. Mesh
        Segment >.. Mesh
        Triangle <.. Mesh
  </div>

.. prf:remark::

  La méthode la plus délicate à construire est :code:`GmshToMesh`. Pour vous aider un petit peu, n'hésitez pas à fouiller dans `l'API de GMSH <https://gitlab.onelab.info/gmsh/gmsh/blob/master/api/gmsh.py>`_) :

  - :code:`gmsh.model.mesh.getNodes()` : retourne tous les noeuds
  - :code:`gmsh.model.getPhysicalGroups()` : retourne tous les groupes physiques avec leurs dimension et tag
  - :code:`gmsh.model.getEntitiesForPhysicalGroup(dim, physical_tag)` : retourne toutes les entités d'un groupe physique
  - :code:`gmsh.model.mesh.getElements(dim, tag)` : retourne tous les éléments de dimension :code:`dim` (segments (:code:`dim=1`), triangles (:code:`dim=2`), ...) appartenant à l'entity de label :code:`tag`.

  L'algorithme ressemble surement à ceci :
  
  .. code-block:: bash

    // Création des points
    For every Nodes
      Point(...)
    End
    //Création des éléments
    For every Physical Entity
      For every Entity
        For every Element


.. raw:: html

   <script defer="defer" src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>