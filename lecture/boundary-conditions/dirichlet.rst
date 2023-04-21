Condition de Dirichlet
======================

Homogène
--------


Formulation Faible
++++++++++++++++++

Soit le problème suivant (notez l'absence du terme en :math:`u`)

.. math::
  :label: diri-pb

  \left\{ 
    \begin{array}{r c l l}
      -\Delta u &=& f & (\Omega),\\
      u & = & 0 & (\Gamma := \partial\Omega).
    \end{array}
    \right.

Multiplions l'EDP :eq:`diri-pb` par des fonctions tests :math:`v`, intégrons sur :math:`\Omega` et appliquons le Théorème de Green :

.. math:: \begin{aligned}
  -\Delta u  = f &\implies \forall v,\quad  (-\Delta u) v = fv \\   
  &\implies \forall v,\quad  -\int_{\Omega}(\Delta u) v = \int_{\Omega} fv \\
  &\implies \forall v,\quad  \int_{\Omega}\nabla u \cdot\nabla v - \int_{\Gamma} (\dn u) v= \int_{\Omega} fv
  \end{aligned}

Nous sommes théoriquement bloqué. Nous sommes tentés de dire que :math:`\dn u = 0` mais non seulement nous ne le savons pas, mais en plus c'est très probablement faux ! Utiliser les conditions aux bords est en revanche la bonne idée. Nous savons que :math:`u` est nul sur le bord :math:`\Gamma`. Autrement dit, nous ne cherchons pas la valeur de la solution sur ce bord, nous la connaissons déjà. Afin de conserver la symétrie entre :math:`u` et :math:`v`, imposons à :math:`v` d'être aussi nul sur le bord et regardons ce que l'on obtient :

.. math:: 
  
  -\Delta u  = f   \implies \forall v, v|_\Gamma = 0 \quad  \int_{\Omega}\nabla u \cdot\nabla v = \int_{\Omega} fv

En terme de dérivabilité, l'espace :math:`\Ho` est suffisant pour la solution :math:`u` et les fonctions tests :math:`v`. Il manque toutefois la condition de Dirichlet, dite **essentielle**, qui doit être incluse dans l'espace fonctionnel. Pour cela, en rappelant que :math:`\gamma` est l'application trace de :math:`\Ho` sur :math:`L^2(\Gamma)`, nous introduisons un espace de Sobolev qui prend en compte cette condition de Dirichlet.

.. math:: \Hoz = \enstq{u\in\Ho}{\gamma u = 0},

La formulation faible s'écrit alors

.. math:: \left\{\begin{aligned}
  &\text{Trouver } u\in\Hoz\text{ tel que}\\
  &\forall v\in\Hoz, \quad a(u,v)=\ell(v),
  \end{aligned}\right.

avec

.. math:: \begin{array}{ r c c l}
  a \colon & \Hoz \times \Hoz  &\longrightarrow & \Rb\\
   & (u,v) & \longmapsto & \displaystyle \int_{\Omega}\nabla u\cdot\nabla v\\
  \ell \colon & \Hoz  &\longrightarrow & \Rb\\
   & v & \longmapsto & \displaystyle \int_{\Omega} f v
  \end{array}

.. prf:remark::

  Attention, c'est parce que :math:`v` est nul sur :math:`\Gamma` que l'intégrale sur :math:`\Gamma` s'annule. Ce n'est pas parce que :math:`\dn u=0` ! D'ailleurs, sauf si :math:`u=0` partout, il y a fort à parier que :math:`\dn u\neq 0` !


Démontrons maintenant que cette formulation faible admet une unique solution. Commençons tout d'abord par montrer que :math:`\Hoz` est un espace de Hilbert.

.. prf:lemma::

  L'espace :math:`\Ho` est de Hilbert

.. prf :remark::

  L'espace :math:`\Hoz` est le noyau de :math:`\gamma`, qui est continue, ce qui implique que :math:`\Hoz` est fermé. Comme de plus :math:`\Hoz\subset\Ho`, avec :math:`\Ho` un Hilbert, alors :math:`\Hoz` est également un Hilbert.


Ensuite, la continuité de :math:`\ell` a déjà été démontrée dans :math:`\Ho` et donc dans :math:`\Hoz`. Occupons nous de :math:`a(\cdot,\cdot)`.

- Continuité de :math:`a(\cdot,\cdot)`.

  .. math:: \begin{aligned}
    \forall u,v\in\Hoz, \abs{a(u,v)} & =  \abs{\int_\Omega \nabla u\cdot\nabla v}\\
    & \leq \normL{\nabla u}\normL{\nabla v} & \text{Cauchy Schwarz}\\
    & \leq \normH{u}\normH{v} & \text{Inégalité des normes}
    \end{aligned}

- Coercivité de :math:`a(\cdot,\cdot)` :

  .. math:: \forall u\in\Hoz, a(u,u) = \int_{\Omega} \nabla u\cdot\nabla u = \normL{\nabla u}^2 \geq \ldots 

  La coercivité est en réalité compliquée à obtenir puisque nous aimerions avoir :

  .. math:: \normL{\nabla u}^2 \geq C \normH{u}^2 =  C\left(\normL{u}^2 + \normL{\nabla u}^2\right)

L'inégalité de Poincaré vient alors à notre rescousse !

.. prf:proposition:: Inégalité de Poincaré (admise)

  Il existe une constante :math:`C` ne dépendant que de :math:`\Omega` telle que 

  .. math:: \forall u\in\Hoz, \qquad \normL{\nabla u} \geq C \normH{u}

.. prf:remark::

  L'inégalité de Poincaré est également valable si la condition de Dirichlet n'est posée que sur une partie :math:`\GammaD` du bord :math:`\Gamma`. Dans ce cas, l'espace considéré est :math:`\HoD := \enstq{v\in\Ho}{\gamma_{\GammaD}v = 0}` où :math:`\gamma_{\GammaD} \colon \Ho\to L^2(\GammaD)` est l'application trace sur :math:`\GammaD`. À noter que :math:`\HoD` est un Hilbert pour les mêmes raisons :math:`\Hoz` l'est.


.. prf:remark::

  L'inégalité de Poincaré montre que la semi-norme :math:`v\mapsto \normL{\nabla v}` est une norme sur :math:`\Ho` et est équivalente à la norme usuelle :math:`\normH{\cdot}`, puisque l'on a :math:`\normL{\nabla v} \geq C \normH{v}\geq C\normL{\nabla v}`.

L'inégalité de Poincaré implique la coercivité de :math:`a(\cdot,\cdot)`. Toutes les hypothèses du théorème de Lax-Milgram sont vérifiées et la formulation faible du problème de Dirichlet homogène admet bien une unique solution. 

Implémentation
++++++++++++++

Si :math:`V_h` est l'espace des éléments finis :math:`\Pb^1` sur :math:`\Omega`, alors une discrétisation naturelle de :math:`\Hoz` est l'espace :math:`\Vhz` défini par


.. math:: \Vhz = \enstq{u\in V_h}{ u|_{\Gamma} = 0}





Nous pouvons aussi raisonner sur le système linéaire directement. Nous séparons les degrés de liberté en deux sous-ensembles :

1. Ceux qui appartiennent à :math:`\Omega` ou à :math:`\Gamma_N` : nous les noterons avec un indice :math:`I` (pour Intérieur) : :math:`u_I`
2. Ceux qui appartiennent à :math:`\Gamma_D`, ils seront notés avec un indice :math:`D` : :math:`u_D`

Quitte à renuméroter, le vecteur :math:`U` de degrés de liberté se réécrit

.. math:: 

  U =\left(
    \begin{array}{c}
      u_I\\
      u_D
    \end{array}
  \right),

et le système linéaire :math:`AU = B`  devient :

.. math:: 
  AU = B \iff \left(
  \begin{array}{c c}
    A_{I,I}  & A_{I, D}\\
    A_{D, I} & A_{D,D}
  \end{array}
  \right) \left(
    \begin{array}{c}
      u_I\\
      u_D
    \end{array}
  \right) =  \left(
    \begin{array}{c}
      B_I\\
      B_D
    \end{array}
  \right)

Les degrés de liberté :math:`u_D` sont en réalité fixés à 0 du fait de la condition de Dirichlet, autrement dit, le système à résoudre se résume à (:math:`I_{D,D}` étant la matrice identité) :

.. math:: 
  :label: eq-diri-system

  AU = B \iff 
  \left(
    \begin{array}{c c}
      A_{I,I}  &A_{I,D}\\
      0 & I_{D,D}
    \end{array}
  \right)
  \left(
    \begin{array}{c}
      u_I\\
      u_D
    \end{array}
  \right)  = 
  \left(
    \begin{array}{c}
      B_I\\
      0
    \end{array}
  \right)

Informatiquement, nous devons donc rendre les lignes et colonnes associées aux degrés de liberté de Dirichlet, nulles, sauf sur la diagonale avec la valeur 1. Cette opération peut être effectuée après l'assemblage de la matrice ou lors de l'algorithme directement.




.. prf:remark::

  La valeur de 1 sur la diagonale est finalement arbitraire : nous pouvons choisir n'importe quelle valeur. Pour des raisons de précision numérique, il peut être plus pertinent de choisir comme valeur la moyenne de la somme de la diagonale de :math:`A_{I,I}` (sa trace). Cette technique peu coûteuse permet d'éviter de polluer le conditionnement de la matrice par des valeurs potentiellement trop grande ou trop petite par rapport à la "moyenne".


.. prf:remark::

  Dans le cas de condition de Dirichlet homogène, ce système ce simplifie :

  .. math:: 
    AU = B \iff 
    \left(
      \begin{array}{c c}
        A_{I,I}  & 0\\
        0 & I_{D,D}
      \end{array}
    \right)
    \left(
      \begin{array}{c}
        u_I\\
        u_D
      \end{array}
    \right)  = 
    \left(
      \begin{array}{c}
        B_I\\
        0
      \end{array}
    \right),

  ou encore, plus simplement : :math:`A_{I,I} U_I = B_I`. Le système obtenu est de plus petite taille : c'est logique, l'espace :math:`\Vhz` est de dimension le nombre de sommets du maillage moins le nombre de sommets sur le bord :math:`\Gamma`.


Condition hétérogène
--------------------

Notion de relèvement
++++++++++++++++++++

Nous considérons maintenant le cas d'une condition de Dirichlet non homogène, autrement dit, si :math:`g\neq 0` :

.. math:: 
  :label: eq-diri-nonH

  \left\{
    \begin{array}{r c l l}
      -\Delta u & = & f & (\Omega)\\
      u & =  & g & (\Gamma)\\
    \end{array}
  \right.


Nous pouvons introduire l'ensemble suivant

.. math:: \Hog = \enstq{u\in \Ho}{ \gamma u = g},

mais ce **n'est pas un espace vectoriel** ! Pour remédier à ce problème, nous nous ramenons au cas d'une condition de Dirichlet homogène en introduisant un **relèvement** (= une "extension", l'inverse d'une "restriction") :math:`u_g` de :math:`g` : une fonction de :math:`\Ho` telle que :math:`\gamma u_g = g`. Nous ne nous préoccuperons pas de savoir si une telle fonction existe et supposons que tel est le cas. Le problème devient alors de chercher :math:`\ut = u-u_g` satisfaisant :

.. math:: 
 :label: eq-diri-relev

  \left\{
    \begin{array}{r c l l}
      -\Delta \ut & = & f +\Delta u_g & (\Omega)\\
      \ut & =  & 0 & (\Gamma)\\
    \end{array}
  \right.

Nous avons vu plus haut que ce problème admet une unique solution, ce qui implique que :eq:`eq-diri-nonH` admet également une unique solution.

.. prf:remark::

  Le relèvement n'est pas unique, puisque si :math:`u_0\in\Hoz` alors :math:`u_g + u_0` est aussi un relèvement acceptable.

.. prf:remark::

  Pour que le relèvement existe, il suffit que :math:`g\in H^{1/2}(\Gamma)`. Cet espace est composé des traces sur :math:`\Gamma` des fonctions de :math:`\Ho` :

  .. math:: H^{1/2}(\Gamma) = \enstq{\gamma v}{v\in\Ho}

  Il contient naturellement :math:`L^2(\Gamma)` puisque :math:`\gamma v\in L^2(\Gamma)`.

Relèvement en :math:`\Pb^1`
+++++++++++++++++++++++++++

En éléments finis :math:`\Pb^1`, un relèvement naturel est la fonction :math:`u_{h, g}` de :math:`\Vh` telle que

.. math:: 

  u_{h,g}(\vertice_j) =
    \left\{
    \begin{array}{l l}
      g(\vertice_j) & \text{ si }\vertice_j\in\Gamma_D,\\
      0 & \text{ sinon.}
    \end{array}
  \right.

Cette fonction n'est pas un relèvement de :math:`g` puisqu'elle ne coïncide avec :math:`g` que sur les sommets, mais pas nécessairement entre ceux-ci. Toutefois, au niveau discret, elle remplit ce rôle : c'est **un relèvement de l'interpolée** de :math:`g` dans :math:`\Vh` (voir la section suivante). Nous notons :math:`g_h` le vecteur de même taille que :math:`B_D` et de coefficient :math:`g(\vertice_I)` avec :math:`\vertice_I\in\Gamma`. En pratique, appliquer la condition de Dirichlet hétérogène se traduit par la décomposition de la matrice ainsi :

.. math::  \left(
    \begin{array}{c c}
      A_{I,I}  & A_{I, D}\\
      0 & I_{D,D}
    \end{array}
  \right)
  \left(
    \begin{array}{c}
      u_I\\
      u_D
    \end{array}
  \right) = \left(
    \begin{array}{c}
      B_I\\
      g_h
    \end{array}
  \right).

La quantité :math:`g_h` est ici à voir comme un vecteur de coefficient :math:`g(\vertice)`. La matrice obtenue est non symétrique, ce qui peut poser des problèmes (par ex. augmentation du coût de stockage mémoire). Une astuce simple consiste à réécrire sous la forme suivante :

.. math::   \left(
    \begin{array}{c c}
      A_{I,I}  & 0\\
      0 & I_{D,D}
    \end{array}
  \right)
  \left(
    \begin{array}{c}
      u_I\\
      u_D
    \end{array}
  \right)  =   \left(
    \begin{array}{c}
      B_I - A_{I,D} g_h\\
      g_h
    \end{array}
  \right).

.. prf:remark::

  Comme pour Dirichlet homogène, nous pouvons aussi nous contenter de résoudre un système plus petit : :math:`A_{I,I} u_I = B_I-A_{I,D}g_h`.

.. prf:remark::

  Le terme :math:`A_{I,D} g_h` est la version discrète du terme :math:`\Delta u_g` qui apparait dans :eq:`eq-diri-relev`. En effet, la matrice :math:`A` discrétise l'opérateur :math:`a(\cdot,\cdot)` qui, ici, représente le laplacien sous sa forme faible :math:`\int_{\Omega}\nabla u \cdot\nabla v`. Gardez à l'esprit que :math:`A_{I,D}` n'est pas carré et prend en argument un vecteur de la taille le nombre de sommets de :math:`\Gamma` pour retourner un vecteur de taille le nombre de sommets du maillage.
