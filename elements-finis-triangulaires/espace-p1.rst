
Espace P1-Lagrange
===================

La méthode des éléments finis est basée sur la méthode de Galerkin, ou d'approximation interne. L'idée est d'approcher l'espace fonctionnel :math:`\Ho` par un espace de dimension finie.

Nous introduisons maintenant notre premier espace éléments finis : :math:`\Pb^1-` Lagrange ou plus simplement :math:`\Pb^1`, composés des fonctions linéaires par triangles. Nous restons en dimension 2, l'extension à la dimension 3 est relativement directe.

Maillage triangulaire (ou triangulation)
----------------------------------------

Nous découpons maintenant le domaine en triangles pour obtenir un maillage triangulaire (ou triangulation) conforme de :math:`\Omega`. Un maillage est conforme s'il suit les quelques règles simples suivantes :


..   \begin{figure}
    \centering\includestandalone{img/maillage_conforme_ok}
    \caption{Exemple de maillage conforme.}
    \label{fig:meshconforme}
  \end{figure}

- L'union des triangles doit couvrir :math:`\Omega` sans le dépasser : :math:`\Omega = \bigcup_{i=0}^{\Nt} K_p`.
- L'intersection de deux triangles est soit vide, soit une arête commune complète à chacun des deux triangles, soit un sommet de chacun des deux triangles.
- Une arête d'un triangle est soit une arête (complète) d'un autre triangle, soit une partie de :math:`\Gamma`, auquel cas ce segment est complètement inclus soit dans :math:`\GammaD` soit dans :math:`\GammaN` (il n'y a pas d'arête appartenant à la fois à :math:`\GammaD` et à :math:`\GammaN`).

.. \begin{figure}
    \begin{subfigure}{0.48\textwidth}
      \centering\includestandalone{img/maillage_conforme_arete}
      \caption{L'intersection n'est pas une arête complète.}
      \label{fig:meshnonconforme_arete}      
    \end{subfigure}
    \begin{subfigure}{0.48\textwidth}
      \centering\includestandalone{img/maillage_conforme_overlap}
      \caption{Chevauchement des triangles.}
      \label{fig:meshnonconforme_overlap}  
    \end{subfigure}
    \caption{Exemples de maillages non conforme}
  \end{figure}
  La deuxième contrainte impose notamment que deux triangles ne peuvent pas se chevaucher. La figure \ref{fig:meshconforme} montre un exemple de maillage conforme et les figures \ref{fig:meshnonconforme_arete} et \ref{fig:meshnonconforme_overlap} des situations non conformes. La troisième condition implique qu'à l'intersection entre :math:`\GammaD` et :math:`\GammaN`, il existe un sommet qui appartient à plusieurs triangles (si :math:`\GammaD` et :math:`\GammaN` se touchent).

Une telle triangulation sera noté :math:`\Th = \{K_p, i=0, \ldots, \Nt-1\}`, l'indice :math:`h` faisant référence à la **finesse de maillage**, que l'on définit par le grand diamètre des triangles :

.. math:: h := \max_{\tri{}\in\Th}(\diam(\tri{})) = \max_{i=0,\ldots,\Nt-1}(\diam(K_p)).

Le diamètre d'un triangle est la distance maximale entre deux points du triangle. Nous notons de plus :math:`\verticeh` et :math:`\Ah` les ensembles respectivement des sommets et des arêtes de :math:`\Th`. Pour un triangle :math:`\tri{}` arbitraire, nous noterons :math:`[\vertice[0],\vertice[1],\vertice[2]]` ses sommets ordonnés, et le triangle :math:`K_p` aura pour sommet :math:`[\vertice[0][i],\vertice[1][i],\vertice[2][i]]`.

Il existe aujourd'hui des mailleurs automatiques open-source, un des plus connu et que nous utiliserons est `GMSH
<https://gmsh.info>`_ (`un tutoriel <https://bthierry.pages.math.cnrs.fr/tutorial/gmsh>`_ est fourni par moi même). Le maillage automatique reste un métier à part entière tant la complexité est importante notamment en 3D et avec des géométries complexes, non forcément polygonales. D'autres parts, de nombreuses questions sont encore ouvertes aujourd'hui dans ce domaine comme la construction automatique d'un maillage composé de quadrangles. Nous n'entrerons pas dans les détails dans ce sujet, nous serons de simple "utilisateurs et utilisatrices". 

..  \begin{figure}
    \centering\includestandalone{img/orientation}
    \caption{Deux orientations possibles pour un triangle. Dans les maillages considérés, tous les triangles ont la   même orientation.}
    \label{fig:orienation}
  \end{figure}

Fonction linéaire sur un triangle
---------------------------------

**Cas du segment (1D).** Regardons tout d'abord le cas :math:`1D` d'un segment :math:`[\alpha,\beta]` et d'une fonction :math:`p` linéaire sur ce segment : :math:`p(x) = ax + b`. Les coefficients :math:`a` et :math:`b` caractérisent la fonction :math:`p` et sont, de plus, définis de manière unique dès lors que l'on connait la valeur de :math:`p` en :math:`\alpha` et en :math:`\beta` (2 équations à 2 inconnues, linéairement indépendantes). Cette propriété reste naturellement vrai pour un segment :math:`[\vec{\alpha},\vec{\beta}]` "plongé" en dimension :math:`2`. Un point :math:`\xx` de ce segment est décrit par ses coordonées curvilignes : :math:`\xx(s) = (1-s) \vec{\alpha} + s\vec{\beta}`, pour :math:`s\in [0,1]`, et un polynôme :math:`p` de degré :math:`1` sur :math:`[\vec{\alpha}, \vec{\beta}]` s'écrit alors :math:`p(\xx(s)) = (1-s) p(\vec{\alpha}) + s p(\vec{\beta})` pour :math:`s\in [0,1]`. On voit clairement qu'un polynôme de degré 1 sur un segment est défini de manière unique par ses valeurs aux extrémités [#]_.

**Cas du triangle (2D).** Revenons maintenant dans un triangle :math:`\tri{}` non plat et notons :math:`\Pb^1` l'espace des polynômes réels de degré :math:`1` sur :math:`\Rb^2`, qui est de dimension :math:`3`. L'espace :math:`\Pb^1(\tri{})` des fonctions linéaires (ou des polynômes de degré :math:`1`) sur :math:`\tri{}` est lui aussi de dimension 3 :

.. math:: \Pb^1(\tri{}) = \enstq{p}{\exists!a,b,c \text{ tels que } \forall (x,y)\in \tri{}, p(x,y) = a + bx + cy}  

Une fonction :math:`p` de :math:`\Pb^1(\tri{})` est définie de manière unique par ses 3 coefficients :math:`a,b,c`. Inversement, ces trois coefficients sont calculables dès lors que l'on connait la valeur de :math:`p` sur trois points non alignés, comme les 3 sommets du triangle, comme le montre le lemme suivant. Une fonction :math:`p\in\Pb^1(\tri)` est donc définie de manière unique soit par la connaissance des coefficients, soit par la connaissance de sa valeur sur les trois sommets du triangle.

.. prop-unisolvance:
.. proof:proposition::

  Soit :math:`\tri` un triangle non dégénéré de :math:`\Rb^2` de sommets :math:`\vertice[1],\vertice[2],\vertice[3]`. Alors, pour tout jeu de données :math:`\alpha_1,\alpha_2,\alpha_3 \in \Rb`, il existe un unique polynôme de :math:`p\in\Pb^1(\Rb^2)` tels que :math:`p(\vertice_I)=\alpha_i`.

.. proof:proof:: 

  En notant :math:`\vertice_I = (x_i,y_i)` et :math:`p(x,y) = ax + by + c`  avec :math:`a,b,c\in\Rb`, alors le problème revient à résoudre le système linéaire

  .. math:: \left\{
    \begin{array}{r c l}
      ax_1 + by_1 + c &=& \alpha_1\\
      ax_2 + by_2 + c &=& \alpha_2\\
      ax_3 + by_3 + c &=& \alpha_3
    \end{array}
    \right.
    \iff
    \left(
      \begin{array}{c c c}
        x_1 & y_1 & 1\\
        x_2 & y_2 & 1\\
        x_3 & y_3 & 1
      \end{array}
    \right)
    \left(
      \begin{array}{c}
        a\\
        b\\
        c
      \end{array}
    \right)  =
    \left(
      \begin{array}{c}
        \alpha_1\\
        \alpha_2\\
        \alpha_3
      \end{array}
    \right)

  Le déterminant d'un tel système n'est autre que deux fois l'aire du triangle :math:`\tri` qui n'est pas dégénéré :
  
  .. math:: \Delta = 
    \left|
      \begin{array}{c c c}
        x_1 & y_1 & 1\\
        x_2 & y_2 & 1\\
        x_3 & y_3 & 1
      \end{array}
    \right| = 2\mathrm{Aire}(\tri) \neq 0
  
  Le système est donc bien inversible et admet une unique solution :math:`(a,b,c)`.

.. proof:remark::

  Soit une fonction :math:`v \in \Pb^1(\tri)`, linéaire sur le triangle :math:`\tri`. Sa restriction :math:`v|_{\sigma}` à une arête :math:`\sigma` de :math:`\tri` est elle même une fonction linéaire sur :math:`\sigma`. Elle est donc complètement caractérisée par sa valeur aux sommets de l'arête, qui sont aussi des sommets de :math:`\tri`. 


Fonctions linéaires par morceaux (= par triangles)
--------------------------------------------------

Nous pouvons maintenant introduire l'espace fonctionnel :math:`\Pb^1-` Lagrange (souvent abrégé :math:`\Pb^1`). Cet espace, noté :math:`\Vh` contient les fonctions **continues** sur :math:`\overline{\Omega}` et **linéaires sur chaque triangle** :

.. math::  \Vh := \left\{\vh\in\Cscr^0(\overline{\Omega}) ; \forall \tri\in\Th, \vh|_{\tri} \in\Pb^1(\tri)\right\}.

Caractérisons maintenant les fonctions de cet espace. Le premier résultat montre que deux fonctions de :math:`\Vh` sont égales si et seulement si elles coïncident sur tous les sommets de la triangulation :math:`\Th`.

.. lemma-unicitetriangle:
.. proof:lemma::

  Si :math:`\uh,\vh \in \Vh` vérifient :math:`\uh(\vertice) = \vh(\vertice)` pour tout sommet :math:`\vertice` de :math:`\Th`, alors :math:`\uh=\vh` sur :math:`\Omega`.

.. proof:proof::

  En se plaçant sur le triangle :math:`\tri = (\vertice[1],\vertice[2],\vertice[3])` de :math:`\Th`, nous avons :math:`\uh(\vertice_I) = \vh(\vertice_I)` pour :math:`i=1,2,3`. La proposition \ref{prop:unisolvance} implique que :math:`\uh|_{\tri}=\vh|_{\tri}`. Le triangle :math:`\tri` étant arbitraire, cette relation vaut sur tous les éléments de la triangulation. Le même raisonnement peut être effectué sur chaque arête pour obtenir que :math:`\uh-\vh` est nulle sur :math:`\Omega` tout entier.


.. proof:proposition::

  Pour tout jeu de données réelles :math:`(\alpha_i)_{i=0,\ldots,\Ns-1}`, il existe une unique fonction :math:`\vh\in\Vh` vérifiant :math:`\vh(\vertice_I)=\alpha_i` pour tout :math:`i=0,\ldots,\Ns-1`.

.. proof:proof::

  L'unicité est démontrée par le lemme \ref{lemma:unicitetriangle} précédent, il manque donc l'existence. Quitte à renuméroter, prenons un triangle :math:`\tri=(\vertice[0],\vertice[1],\vertice[2])` de :math:`\Th` et le jeu de valeurs associé :math:`(\alpha_0,\alpha_1,\alpha_2) \in \Rb`. La proposition \ref{prop:unisolvance} montre qu'il existe un (unique) polynôme :math:`p_{\tri}` de :math:`\Pb^1(\tri)` tel que :math:`p_{\tri}(\vertice_I)=\alpha_i` pour :math:`i=0,1,2`. Nous pouvons répéter cette opération pour tous les triangles :math:`\tri` et nous introduisons :math:`\uh` tel que

  .. math:: \forall \tri\in\Th,\quad \uh |_{\tri} = p_{\tri}.

  La fonction :math:`\vh` est affine sur chaque triangle, il nous faut montrer que :math:`\uh\in\Cscr^0(\overline{\Omega})` pour conclure sur son appartenance à :math:`\Vh`. Comme :math:`\vh` est continue en chaque sommet :math:`\vertice`, il reste à montrer la continuité sur les arêtes. 
  
  Prenons 2 triangles :math:`K_p` et :math:`\tri[j]` de :math:`\Th` ayant une arête :math:`\Sigma` en commun. Quitte à renuméroter, notons :math:`\vertice[1] = (x_1,y_1)` et :math:`\vertice[2] = (x_2, y_2)` les deux sommets de l'arête :math:`\Sigma` et notons
  
  .. math:: \sigma(t) = \vertice[1] + t(\vertice[2]-\vertice[1]) =
    \left( x_1 + t(x_2-x_1),  y_1 + t(y_2-y_1)\right)
  
  une paramétrisation de :math:`\Sigma`. Si :math:`p_{K_p}(x,y) = ax+by+c`, nous avons alors, pour tout :math:`t\in[0,1]` :

  .. math:: \begin{aligned}
      p_{K_p}(\sigma(t)) &= a (x_1 + t(x_2-x_1)) + b (y_1 + t(y_2-y_1)) + c\\
      &= a (x_1 + t(x_2-x_1)) + b (y_1 + t(y_2-y_1)) + c + t(c-c)\\
      &= [a x_1+by_1 +c] + t([a x_2+by_2 +c] +[ a_T x_1+by_1 +c])\\
      &=  p_{K_p}(\vertice[1]) +t(p_{K_p}(\vertice[2]) - p_{K_p}(\vertice[1]))\\
      &=  p_{\tri[j]}(\vertice[1]) +t(p_{\tri[j]}(\vertice[2]) - p_{\tri[j]}(\vertice[1]))\\
      &=  p_{\tri[j]}(\sigma(t)).
    \end{aligned}

  Autrement dit, les deux polynômes :math:`p_{K_p}` et :math:`p_{\tri[j]}` sont égaux sur l'arête :math:`\Sigma` et :math:`\vh` est bien continue sur toutes les arêtes de :math:`\Th` en plus de l'être sur tous les triangles et tous les sommets : :math:`\vh` est donc bien **continue** sur tout :math:`\overline{\Omega}`.


Base de :math:`\Vh` : les fonctions de forme
---------------------------------------------

Au vu de ce qui précède, deux fonctions de :math:`\Vh` sont identiques si et seulement si elles possèdent la même valeur sur chaque sommet de :math:`\Th`. En notant :math:`\Ns = \mathrm{card}(\verticeh)`, introduisons l'ensemble des **fonctions de forme** :math:`(\mphi_J)_{0\leq j \leq \Ns-1}` de :math:`\Vh`, qui sont **nulles sur chaque sommet sauf un** :

.. math:: \forall i,j =0,..., \Ns-1,\quad
  \mphi_J(\vertice_I) =
  \delta_{i,j}=
  \left\{
    \begin{array}{l l}
      1 & \text{ si } i=j\\
      0 & \text{ sinon.}
    \end{array}
  \right.

Ces fonctions sont la généralisation en 2D des *fonctions chapeau* unidimensionnelles (elles ressemblent d'ailleurs encore plus à un "chapeau" !).

.. proof:proposition::

  La famille :math:`(\mphi_J)_{0\leq j \leq \Ns-1}` est une base de :math:`\Vh`, qui est alors de dimension :math:`\Ns`, le nombre de sommets de la triangulation :math:`\Th`.

.. proof:proof::

  Montrons que la famille des fonctions de forme est une base de :math:`\Vh`. Commençon par le caractère libre de cette famille en prenant :math:`\Ns` données :math:`(\alpha_i)_{0\leq i\leq \Ns-1}`,
  
  .. math::
    \begin{aligned}
      \sum_{i=0}^{\Ns-1} \alpha_i \mphi_I = 0 &\implies \forall j=0,\ldots, \Ns-1,\quad \sum_{i=0}^{\Ns-1} \alpha_i\mphi_I(\vertice_j) = 0\\
      &\implies \forall j= 0,\ldots, \Ns-1,\quad \alpha_j \times 1 +  \sum_{i=0, i\neq j}^{\Ns-1}(\alpha_j\times 0) = 0\\
      & \implies \forall j= 0,\ldots, \Ns-1,\quad \alpha_j = 0
    \end{aligned}

  La famille de fonctions :math:`(\mphi_I)_{0\leq i \leq \Ns-1}` est libre. Pour montrer qu'elle est génératrice, prenons une fonction :math:`\uh\in \Vh` et plaçons nous sur le triangle :math:`\tri = (\vertice[1], \vertice[2],\vertice[3])` (quitte à renuméroter). Le polynôme :math:`\left(\sum_{i=0}^2\uh(\vertice_I)\mphi_I\right)\Big|_{\tri}` coïncide avec le polynôme :math:`\uh|_{\tri}` sur les sommets du triangle :math:`\tri`. Les deux étant de degré 1, nous avons alors l'égalité de ces polynômes sur tout le triangle :
  La famille de fonctions :math:`(\mphi_I)_{0\leq i \leq \Ns-1}` est libre. Pour montrer qu'elle est génératrice, prenons une fonction :math:`\uh\in \Vh` et plaçons nous sur le triangle :math:`\tri = (\vertice[1], \vertice[2],\vertice[3])` (quitte à renuméroter). Le polynôme :math:`\left(\sum_{i=0}^2\uh(\vertice_I)\mphi_I\right)\Big|_{\tri}` coïncide avec le polynôme :math:`\uh|_{\tri}` sur les sommets du triangle :math:`\tri`. Les deux étant de degré 1, nous avons alors l'égalité de ces polynômes sur tout le triangle :
  .. math:: \uh|_{\tri}= \left(\sum_{i=0}^2\uh(\vertice_I)\mphi_I\right)\Bigg|_{\tri}.

  Cette relation étant valable sur un triangle arbitraire, elle est vraie sur :math:`\Omega`. La famille de fonctions :math:`(\mphi_I)_i` est donc une base de :math:`\Vh`.

.. proof:proposition::Admis pour le moment
  L'espace :math:`\Vh` est inclus dans :math:`\Ho`.


.. proof:lemma::

  Le support d'une fonction de forme :math:`\mphi_J` est l'union des triangles ayant pour sommet :math:`\vertice_j` :
  .. math:: \mathrm{supp}(\mphi_J) = \enstq{T\in \verticeh}{\vertice_j \text{ est un sommet de } \tri}.
Autrement dit, en dehors de ces triangles, la fonction $\mphi_J$ est nulle.

.. proof:proof::

  Prenons une fonction de forme :math:`\mphi_J` associée au sommet :math:`\vertice_j`, et un triangle :math:`\tri` dont aucun sommet n'est :math:`\vertice_j`. Alors dans ce cas, :math:`\mphi_J` est nulle sur les trois sommets de :math:`\tri`, et est donc nulle sur le triangle tout entier.


Au final, pour une fonction :math:`\uh` de :math:`\Vh`, retenons que :

- :math:`\uh` est (par définition) continue et linéaire sur chaque triangle
- La dimension de :math:`\Vh` est égale au nombre de sommets :math:`\Ns` du maillage. Plus le maillage est fin, plus la dimension est grande.
- La famille :math:`(\mphi_I)_I` des fonctions de forme est une base de :math:`\Vh`. Autrement dit, il existe :math:`\Ns` uniques coefficients :math:`(u_I)_I`, tels que
  .. math::  \uh = \sum_{I=0}^{\Ns-1} u_I\mphi_I
 - Une fonction :math:`\uh` de :math:`\Vh` est caractérisée par sa valeur aux :math:`\Ns` sommets
 - Les coefficients sont en fait la valeur de :math:`\uh` aux sommets : :math:`u_I = \uh(\vertice_I)` :
  .. math:: \sum_{I = 0}^{\Ns-1} \uh(\vertice_I)\mphi_I(\vertice_J) = \uh(\vertice_J)\mphi_J(\vertice_J) = \uh(\vertice_J).
- Le support d'une fonction de forme :math:`\mphi_I` est l'union des triangles ayant pour sommets :math:`\vertice_I`. Il est donc très petit par rapport à :math:`\Omega`.

.. [#] Au lycée on disait "entre deux points ne passe qu'une et une seule droite".