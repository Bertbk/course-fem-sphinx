Espace :math:`\Pb^1`-Lagrange
=============================

La méthode des éléments finis est basée sur la méthode de Galerkin, ou d'approximation interne. L'idée est d'approcher l'espace fonctionnel :math:`\Ho` par un espace de dimension finie : l'espace éléments finis. Nous nous intéressons à un tel premier espace : :math:`\Pb^1-` Lagrange ou plus simplement :math:`\Pb^1`, composés des fonctions linéaires par triangles. 

Maillage triangulaire (ou triangulation)
----------------------------------------

Nous découpons maintenant le domaine en triangles pour obtenir un maillage triangulaire (ou triangulation) conforme de :math:`\Omega`. Un maillage est conforme s'il suit les quelques règles simples suivantes. Une illustration est proposée sur la figure :numref:`{number} <fig-example-mesh>`.


- L'union des :math:`\Nt` triangles doit couvrir :math:`\Omega` sans le dépasser : :math:`\Omega = \bigcup_{p=1}^{\Nt} \tri_p`.
- L'intersection de deux triangles est soit vide, soit une arête commune complète à chacun des deux triangles, soit un sommet de chacun des deux triangles.
- Une arête d'un triangle est soit une arête (complète) d'un autre triangle, soit une partie de :math:`\Gamma`, auquel cas ce segment est complètement inclus soit dans :math:`\GammaD` soit dans :math:`\GammaN` (il n'y a pas d'arête appartenant à la fois à :math:`\GammaD` et à :math:`\GammaN`).

.. _fig-example-mesh:

.. figure:: /img/conform/conform.*
  :figwidth: 100%
  :width: 100%
  :alt: Maillages conformes ou non
  :align: center

  Différents maillages, conforme ou non.

Une telle triangulation sera noté :math:`\Th = \{K_p, p=1, \ldots, \Nt\}`, l'indice :math:`h` faisant référence à la **finesse de maillage**, que l'on définit par le grand diamètre des triangles :

.. math:: h := \max_{\tri\in\Th}(\diam(\tri)) = \max_{p=1,\ldots,\Nt}(\diam(\tri_p)).

Le diamètre d'un triangle est la distance maximale entre deux points du triangle. Nous notons de plus :math:`\Sh` et :math:`\Ah` les ensembles respectivement des sommets et des arêtes de :math:`\Th`. Pour un triangle arbitraire :math:`\tri`, nous noterons :math:`[\vertice_{0},\vertice_{1},\vertice_{2}]` ses sommets ordonnés. De même, pour un triangle :math:`\tri_p` du maillage, ses sommets ordonnées seront notés :math:`[\vertice_{0}^{p},\vertice_{1}^{p},\vertice_{2}^{p}]`.

.. prf:remark::

  Il existe aujourd'hui des mailleurs automatiques open-source, un des plus connu et que nous utiliserons est `GMSH <https://gmsh.info>`_ (`un tutoriel <https://bthierry.pages.math.cnrs.fr/tutorial/gmsh>`_ est fourni par moi même). Le maillage automatique reste un métier à part entière tant la complexité est importante notamment en 3D et avec des géométries complexes, non forcément polygonales. D'autres parts, de nombreuses questions sont encore ouvertes aujourd'hui dans ce domaine comme la construction automatique d'un maillage composé de quadrangles. Nous n'entrerons pas dans les détails dans ce sujet, nous serons de simple "utilisateurs et utilisatrices". 

.. _fig-orienation:

.. figure:: /img/orientation/orientation.*
  :figwidth: 100%
  :width: 100%
  :alt: Orientation des triangles
  :align: center

  Deux orientations possibles pour un triangle. Dans les maillages considérés, tous les triangles ont la   même orientation.


.. TODO: lien plein écran kaputt

.. only:: html

  Voici deux exemples de maillage obtenus avec GMSH, et visualisés avec Paraview :

  - Sous-marin

    - `Script GMSH <https://github.com/Bertbk/geogmsh/blob/master/submarine.geo>`__
    - `Plein écran <../../../_static/mesh/submarine.html>`__

  .. raw:: html

    <object type="text/html" data="../../../_static/mesh/submarine.html" width="100%" height="auto"></object>

  - Théière

    - `Script GMSH <https://github.com/Bertbk/geogmsh/blob/master/teapot.geo>`__
    - `Plein écran <../../../_static/mesh/teapot.html>`__

  .. raw:: html

    <object type="text/html" data="../../../_static/mesh/teapot.html" width="100%" height="auto"></object>



Fonction linéaire sur un triangle
---------------------------------

**Cas du segment (1D).** Regardons tout d'abord le cas :math:`1D` d'un segment :math:`[\alpha,\beta]` et d'une fonction :math:`p` linéaire sur ce segment : :math:`p(x) = ax + b`. Les coefficients :math:`a` et :math:`b` caractérisent la fonction :math:`p` et sont, de plus, définis de manière unique dès lors que l'on connait la valeur de :math:`p` en :math:`\alpha` et en :math:`\beta` (2 équations à 2 inconnues, linéairement indépendantes). Cette propriété reste naturellement vraie pour un segment :math:`[\vec{\alpha},\vec{\beta}]` "plongé" en dimension 2. Un point :math:`\xx` de ce segment est décrit par ses coordonées curvilignes : :math:`\xx(s) = (1-s) \vec{\alpha} + s\vec{\beta}`, pour :math:`s\in [0,1]`, et un polynôme :math:`p` de degré 1 sur :math:`[\vec{\alpha}, \vec{\beta}]` s'écrit alors :math:`p(\xx(s)) = (1-s) p(\vec{\alpha}) + s p(\vec{\beta})` pour :math:`s\in [0,1]`. On voit clairement qu'un polynôme de degré 1 sur un segment est défini de manière unique par ses valeurs aux extrémités [#]_.

**Cas du triangle (2D).** Revenons maintenant dans un triangle :math:`\tri` non plat et notons :math:`\Pb^1` l'espace des polynômes réels de degré 1 sur :math:`\Rb^2`, de dimension 3 :

.. math:: \Pb^1(\Rb) = \enstq{p\colon \Rb^2\to\Rb}{\exists!a,b,c \in\Rb \text{ tels que } \forall (x,y)\in \Rb^2, p(x,y) = a + bx + cy}

L'espace :math:`\Pb^1(\tri)` des fonctions linéaires (ou des polynômes de degré 1) sur :math:`\tri` est lui aussi de dimension 3 (car :math:`\tri` n'est pas plat) :

.. math:: \Pb^1(\tri) = \enstq{p\colon K\to\Rb}{\exists!a,b,c \in\Rb \text{ tels que } \forall (x,y)\in \tri, p(x,y) = a + bx + cy}  

Une fonction :math:`p` de :math:`\Pb^1(\tri)` est définie de manière unique par ses 3 coefficients :math:`a,b,c`. Inversement, ces trois coefficients sont calculables dès lors que l'on connait la valeur de :math:`p` sur trois points non alignés, comme les 3 sommets du triangle (voir la proposition suivant). Une fonction :math:`p\in\Pb^1(\tri)` est donc définie de manière unique soit par la connaissance de ses trois coefficients, soit par la connaissance de sa valeur sur les trois sommets du triangle.

.. _prop-unisolvance:

.. prf:proposition::

  Soit :math:`\tri` un triangle non dégénéré de :math:`\Rb^2` de sommets :math:`\vertice_{1},\vertice_{2},\vertice_{3}`. Alors, pour tout jeu de données :math:`\alpha_1,\alpha_2,\alpha_3 \in \Rb`, il existe un unique polynôme de :math:`p\in\Pb^1(\tri)` tels que :math:`p(\vertice_i)=\alpha_i` pour :math:`i=1,2,3`.

.. prf:proof:: 

  En notant :math:`\vertice_i= (x_i,y_i)` et :math:`p(x,y) = ax + by + c`  avec :math:`a,b,c\in\Rb`, alors le problème revient à résoudre le système linéaire

  .. math:: \left\{
    \begin{array}{r c l}
      ax_1 + by_1 + c &=& \alpha_1\\
      ax_2 + by_2 + c &=& \alpha_2\\
      ax_3 + by_3 + c &=& \alpha_3\\
    \end{array}
    \right.
    \iff
    \left(
      \begin{array}{c c c}
        x_1 & y_1 & 1\\
        x_2 & y_2 & 1\\
        x_3 & y_3 & 1\\
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
        \alpha_1 \\
        \alpha_2 \\
        \alpha_3 \\
      \end{array}
    \right)

  Le déterminant d'un tel système n'est autre que deux fois l'aire du triangle :math:`\tri` qui n'est pas dégénéré :
  
  .. math:: \Delta = 
    \left|
      \begin{array}{c c c}
        x_1 & y_1 & 1\\
        x_2 & y_2 & 1\\
        x_3 & y_3 & 1\\
      \end{array}
    \right| = 2\mathrm{Aire}(\tri) \neq 0
  
  Le système est donc bien inversible et admet une unique solution :math:`(a,b,c)`.

.. prf:remark::

  Soit une fonction :math:`v \in \Pb^1(\tri)`, linéaire sur le triangle :math:`\tri`. Sa restriction :math:`v|_{\sigma}` à une arête :math:`\sigma` de :math:`\tri` est elle même une fonction linéaire sur :math:`\sigma`. Elle est donc complètement caractérisée par sa valeur aux sommets de l'arête, qui sont aussi des sommets de :math:`\tri`.


Fonctions linéaires par éléments (= par triangles)
--------------------------------------------------

Nous pouvons maintenant introduire l'espace fonctionnel :math:`\Pb^1-` Lagrange, souvent abrégé :math:`\Pb^1` et noté dans ce cours :math:`\Vh`, contient les fonctions **continues** sur :math:`\overline{\Omega}` (le fermé de :math:`\Omega`) et **linéaires sur chaque triangle** :

.. math::  \Vh := \enstq{\vh\in\Cscr^0(\overline{\Omega})}{\forall \tri\in\Th, \vh|_{\tri} \in\Pb^1(\tri)}.

Caractérisons maintenant les fonctions de cet espace. Le premier résultat montre que deux fonctions de :math:`\Vh` sont égales si et seulement si elles coïncident sur tous les sommets de la triangulation :math:`\Th`.

.. _lemma-unicitetriangle: 

.. prf:lemma:: 

  Si :math:`\uh,\vh \in \Vh` vérifient :math:`\uh(\vertice) = \vh(\vertice)` pour tout sommet :math:`\vertice` de :math:`\Th`, alors :math:`\uh=\vh` sur :math:`\Omega`.

.. prf:proof::

  En se plaçant sur le triangle :math:`\tri = (\vertice_{1},\vertice_{2},\vertice_{3})` de :math:`\Th`, nous avons :math:`\uh(\vertice_i) = \vh(\vertice_i)` pour :math:`i=1,2,3`. :numref:`La proposition {number} <prop-unisolvance>` implique que :math:`\uh|_{\tri}=\vh|_{\tri}`. Le triangle :math:`\tri` étant arbitraire, cette relation vaut sur tous les éléments de la triangulation. Le même raisonnement peut être effectué sur chaque arête pour obtenir que :math:`\uh-\vh` est nulle sur :math:`\Omega` tout entier.

.. prf:proposition::

  Pour tout jeu de données réelles :math:`(\alpha_i)_{i=1,\ldots,\Ns}`, il existe une unique fonction :math:`\vh\in\Vh` vérifiant :math:`\vh(\vertice_I)=\alpha_i` pour tout :math:`i=1,\ldots,\Ns`.

.. prf:proof::

  L'unicité est démontrée par le :numref:`lemme {number} <lemma-unicitetriangle>`, il manque donc l'existence. Prenons un triangle :math:`\tri_p=(\vertice_{1}^p,\vertice_{2}^p,\vertice_{3}^p)` de :math:`\Th` et le jeu de valeurs associé :math:`(\alpha_1^p,\alpha_2^p,\alpha_3^p) \in \Rb`. :numref:`La proposition {number} <prop-unisolvance>` montre qu'il existe un unique polynôme :math:`p_{\tri_p}` de :math:`\Pb^1(\tri_p)` tel que :math:`p_{\tri_p}(\vertice_i^p)=\alpha_i^p` pour :math:`i=1,2,3`. Nous pouvons répéter cette opération pour tous les triangles :math:`\tri_p` et nous introduisons :math:`\uh` tel que

  .. math:: \forall p=1,\ldots,\Nt,\quad \uh |_{\tri_p} = p_{\tri_p}.

  La fonction :math:`\vh` est affine sur chaque triangle, il nous faut montrer que :math:`\uh\in\Cscr^0(\overline{\Omega})` pour conclure sur son appartenance à :math:`\Vh`. Comme :math:`\vh` est continue en chaque sommet :math:`\vertice`, il reste à montrer la continuité sur les arêtes. 
  
  Prenons 2 triangles :math:`\tri_p` et :math:`\tri_q` de :math:`\Th` ayant une arête :math:`\Sigma` en commun. Quitte à renuméroter, notons :math:`\vertice_{1} = (x_1,y_1)` et :math:`\vertice_{2} = (x_2, y_2)` les deux sommets de l'arête :math:`\Sigma` et notons
  
  .. math:: \sigma(t) = \vertice_{1} + t(\vertice_{2}-\vertice_{1}) = \left( x_1 + t(x_2-x_1),  y_1 + t(y_2-y_1)\right)
  
  une paramétrisation de :math:`\Sigma`. Si :math:`p_{\tri_p}(x,y) = ax+by+c`, nous avons alors, pour tout :math:`t\in[0,1]` :

  .. math:: \begin{aligned}
      p_{\tri_p}(\sigma(t)) &= a (x_1 + t(x_2-x_1)) + b (y_1 + t(y_2-y_1)) + c\\
      &= a (x_1 + t(x_2-x_1)) + b (y_1 + t(y_2-y_1)) + c + t(c-c)\\
      &= [a x_1+by_1 +c] + t([a x_2+by_2 +c] +[ a x_0+by_0 +c])\\
      &=  p_{\tri_p}(\vertice_{1}) +t(p_{\tri_p}(\vertice_{2}) - p_{K_p}(\vertice_{1}))\\
      &=  p_{\tri_q}(\vertice_{1}) +t(p_{\tri_q}(\vertice_{2}) - p_{\tri_q}(\vertice_{1}))\\
      &=  p_{\tri_q}(\sigma(t)).
    \end{aligned}

  Autrement dit, les deux polynômes :math:`p_{\tri_p}` et :math:`p_{\tri_q}` sont égaux sur l'arête :math:`\Sigma`. La fonction :math:`\vh` est donc continue sur toutes les arêtes de :math:`\Th` en plus de l'être sur tous les triangles et tous les sommets : :math:`\vh` est donc bien **continue** sur tout :math:`\overline{\Omega}`.


Base de :math:`\Vh` : les fonctions de forme
---------------------------------------------

Au vue de ce qui précède, deux fonctions de :math:`\Vh` sont identiques si et seulement si elles possèdent la même valeur sur chaque sommet de :math:`\Th`. En notant :math:`\Ns = \card(\Sh)` le nombre de sommets du maillage, introduisons la famille des **fonctions de forme** :math:`(\mphi_I)_{1\leq I \leq \Ns}` de :math:`\Vh`, qui sont **nulles sur chaque sommet sauf un** :

.. math:: 

  \forall I,J =1,..., \Ns,\quad
  \mphi_I(\vertice_J) =
  \delta_{I,J}=
  \left\{
    \begin{array}{l l}
      1 & \text{ si } I=J\\
      0 & \text{ sinon.}
    \end{array}
  \right.

Ces fonctions sont la généralisation en 2D des *fonctions chapeau* unidimensionnelles (elles ressemblent d'ailleurs encore plus à un "chapeau" !). 

.. only:: html

  Une `application pour visualiser les fonctions de forme <#app-basis-function>`_ est proposée plus bas.

.. prf:proposition::

  La famille :math:`(\mphi_I)_{1\leq I \leq \Ns}` est une base de :math:`\Vh`, qui est alors de dimension :math:`\Ns`, le nombre de sommets de la triangulation :math:`\Th`.

.. prf:proof::

  Montrons que la famille des fonctions de forme est une base de :math:`\Vh`. Commençon par le caractère libre de cette famille en prenant :math:`\Ns` données :math:`(\alpha_i)_{1\leq i\leq \Ns}`,
  
  .. math::

    \begin{aligned}
      \sum_{I=1}^{\Ns} \alpha_I \mphi_I = 0 &\implies \forall j=1,\ldots, \Ns,\quad \sum_{I=1}^{\Ns} \alpha_I\mphi_I(\vertice_j) = 0\\
      &\implies  \forall J= 1,\ldots, \Ns,\quad \alpha_J \times 1 +  \sum_{I=1, I\neq J}^{\Ns}(\alpha_J\times 0) = 0\\
      & \implies \forall J= 1,\ldots, \Ns,\quad \alpha_J = 0
    \end{aligned}

  La famille de fonctions :math:`(\mphi_I)_{1\leq I \leq \Ns}` est libre. Pour montrer qu'elle est génératrice, prenons une fonction :math:`\uh\in \Vh` et plaçons nous sur le triangle :math:`\tri = (\vertice_{1}, \vertice_{2},\vertice_{3})` (quitte à renuméroter). Le polynôme :math:`\left(\sum_{I=1}^3\uh(\vertice_I)\mphi_I\right)\Big|_{\tri}` coïncide avec le polynôme :math:`\uh|_{\tri}` sur les sommets du triangle :math:`\tri`. Les deux étant de degré 1, nous avons alors l'égalité de ces polynômes sur tout le triangle :

    .. math:: \uh|_{\tri}= \left(\sum_{I=1}^3\uh(\vertice_I)\mphi_I\right)\Bigg|_{\tri}.

  Cette relation étant valable sur un triangle arbitraire, elle est vraie sur :math:`\Omega`. La famille de fonctions :math:`(\mphi_I)_I` est donc une base de :math:`\Vh`.

.. prf:proposition:: Admis pour le moment

  L'espace :math:`\Vh` est inclus dans :math:`\Ho`.


.. prf:lemma::

  Le support d'une fonction de forme :math:`\mphi_I` est l'union des triangles ayant pour sommet :math:`\vertice_I` :
  
  .. math:: \supp(\mphi_I) = \enstq{\tri\in \Th}{\vertice_I \text{ est un sommet de } \tri}.

  Autrement dit, en dehors de ces triangles, la fonction :math:`\mphi_I` est nulle.

.. prf:proof::

  Prenons une fonction de forme :math:`\mphi_I` associée au sommet :math:`\vertice_I`, et un triangle :math:`\tri` tel que :math:`\vertice_I` n'est pas un sommet de :math:`\tri`. Dans ce cas, :math:`\mphi_I` est nulle sur les trois sommets de :math:`\tri`, et est donc nulle sur le triangle tout entier.


Une illustration du support des fonctions de forme est donnée sur la Figure :numref:`{number} <fig-support>`.


.. _fig-support:

.. figure:: /img/support/support.*
  :figwidth: 100%
  :width: 100%
  :alt: Exemple de support de fonction de forme
  :align: center
  
  Support des fonctions de forme pour le maillage d'un carré.


.. raw:: html

  <a href="#app-basis-function">L'application ci-dessous</a> propose de visualiser les fonctions de forme sur un petit maillage.

  <div id="app-basis-function" class="app-container">
    <iframe id="iframe-basis-function" class="app-content" src='../../../_static/app/basis-function/index.html' scrolling="no"></iframe>
    <p><strong>Application</strong> : <strong>Cliquez sur un sommet</strong> pour faire apparaitre <strong>la fonction de forme P1 associée</strong>. Les triangles où la fonction n'est pas nulle forment <strong>le support de la fonction de forme</strong>. 
    </p>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.1/iframeResizer.min.js" integrity="sha512-ngVIPTfUxNHrVs52hA0CaOVwC3/do2W4jUEJIufgZQicmY27iAJAind8BPtK2LoyIGiAFcOkjO18r5dTUNLFAw==" crossorigin="anonymous"></script>
  <script>
    iFrameResize({}, '#iframe-basis-function')
  </script>

Avant de conclure cette section, soulignons ce résultat intéressant.

.. _lemma-sum-form-function:

.. prf:lemma::

  La somme des fonctions de forme est égale à la fonction constante égale à 1 :

  .. math:: 
    
    \sum_{I}^{\Ns} \mphi_I=1.

.. prf:proof::

  La fonction :math:`\sum_{I} \mphi_I` est linéaire sur chaque triangle et vaut 1 sur chaque sommet, comme la fonction constante égale 1. L'unicité nous permet de conclure.

Conclusion
-----------

Pour une fonction :math:`\uh` de :math:`\Vh`, retenons que :

- :math:`\uh` est (par définition) continue et linéaire sur chaque triangle
- La dimension de :math:`\Vh` est égale au nombre de sommets :math:`\Ns` du maillage. Plus le maillage est fin, plus la dimension est grande.
- La famille :math:`(\mphi_I)_I` des fonctions de forme est une base de :math:`\Vh`. Autrement dit, il existe :math:`\Ns` uniques coefficients :math:`(u_I)_I`, tels que

  .. math:: \uh = \sum_{I=1}^{\Ns} u_I\mphi_I

- Une fonction :math:`\uh` de :math:`\Vh` est caractérisée par sa valeur aux :math:`\Ns` sommets
- Les coefficients sont en fait la valeur de :math:`\uh` aux sommets : :math:`u_I = \uh(\vertice_I)` :
  
  .. math:: \sum_{I = 1}^{\Ns} \uh(\vertice_I)\mphi_I(\vertice_J) = \uh(\vertice_J)\mphi_J(\vertice_J) = \uh(\vertice_J).

- Le support d'une fonction de forme :math:`\mphi_I` est l'union des triangles ayant pour sommets :math:`\vertice_I`. Il est donc très petit par rapport à :math:`\Omega`.



.. [#] Au lycée on disait "entre deux points ne passe qu'une et une seule droite".
