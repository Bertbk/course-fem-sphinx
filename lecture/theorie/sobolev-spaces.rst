Espaces de Sobolev
==================

Espace :math:`\Lo`
------------------

Rappelons que l'espace :math:`\Lo` est l'espace des fonctions de carré mesurable (au sens de Lebesgue). Muni du produit scalaire


.. math:: \PSL{f}{g} = \int_{\Omega} f(\xx)g(\xx)\diff \xx,


l'espace :math:`\Lo` est un espace de Hilbert, de norme induite :

.. math:: \normL{f} = \left(\int_{\Omega} \abs{f(\xx)}^2\diff \xx\right)^{\frac{1}{2}}.

Il est important de remarquer qu'une fonction de :math:`\Lo` est définie **presque partout**. Autrement dit, deux fonctions :math:`f` et :math:`g` de :math:`\Lo` peuvent être *égales* tout en ayant des valeurs différentes sur un sous-ensemble :math:`\omega` de :math:`\Omega`, de mesure nulle. Une fonction mesurable est en réalité une *classe de fonctions*.

Introduisons l'espace :math:`\Cscr^{\infty}_c(\Omega)` des fonctions :math:`\Cscr^{\infty}` sur :math:`\Omega` à support compact dans :math:`\Omega` :

.. math:: \Cscr^{\infty}_c(\Omega) := \enstq{f\in \Cscr^{\infty}(\Omega)}{\supp(f) \text{ est compact dans } \Omega}.

.. proof:remark::

  - Ces fonctions (et toutes leurs dérivées) s'annulent nécesairement sur le bord de :math:`\Omega` (qui est ouvert)
  - Dans notre cas, :math:`\Omega\in\Rb^2` (ou même :math:`\Rb^3`), ce qui impliqué qu'un compact de :math:`\Omega` est donc un fermé borné
    - Un exemple d'une telle fonction est la fonction "blob" comme illustré par `l'article Wikipédia <https://fr.wikipedia.org/wiki/Fonction_C%E2%88%9E_%C3%A0_support_compact>`_

Nous rappelons/admettons le théorème de densité suivant.

.. _thm-densite:

.. proof:theorem:: Densité dans :math:`\Lo`

  L'ensemble :math:`\Cscr^{\infty}_c(\Omega)` est dense dans :math:`\Lo`.

Autrement dit, pour tout élément :math:`f` de :math:`\Lo`, il existe une suite :math:`(f_n)_n` de fonctions de :math:`\Cscr^{\infty}_c(\Omega)` qui converge vers :math:`f` pour la norme de :math:`\Lo`. Ce théorème est extrêmement important : pour démontrer des propriétés de :math:`\Lo`, nous utiliserons des propriétés de :math:`\Cscr^{\infty}_c(\Omega)` et passerons à la limite dans :math:`\Lo`.

.. _corollary-f-zero:

.. proof:corollary::

  Soit :math:`f` une fonction de :math:`\Lo` telle que
  
  .. math::   \forall v \in \Cscr^{\infty}_c(\Omega),\qquad \int_{\Omega} f(\xx)v(\xx) \diff\xx= 0,

  alors :math:`f(\xx)=0` presque partout dans :math:`\Omega`.

.. proof:proof::

  D'après le théorème :numref:`{number} <thm-densite>`, il existe une suite :math:`(f_n)_n` de :math:`\Cscr^{\infty}_c(\Omega)` qui converge vers :math:`f`. Nous avons alors
  
  .. math:: 0 = \lim_{n\to \infty}\int_{\Omega} f(\xx)f_n(\xx) \diff\xx= \int_{\Omega}\abs{f(\xx)}^2\diff\xx = \normL{f}^2,

  d'où :math:`f` est nulle "au sens de" :math:`\Lo`, c'est-à-dire que :math:`f(\xx)=0` presque partout.


L'espace :math:`\Lo` est un "petit" espace de Hilbert qui contient :math:`\Cscr^1(\Omega)`. Nous nous rapprochons du but... Cependant les fonctions de :math:`\Lo` ne sont pas dérivables ! Elles ne sont donc pas utilisables en pratique dans les formulations faibles. C'est tout l'objet de la section suivante : proposer une nouvelle forme de dérivation *plus faible*, c'est-à-dire ici, qui ne requiert pas de continuité.

Dérivée faible
--------------

.. proof:definition:: 

  Une fonction de :math:`\Lo` est dérivable au sens faible par rapport à la direction :math:`x_i` si et seulement si il existe un élément :math:`g_i` de :math:`\Lo` tel que
  
  .. math::   \forall v \in \Cscr^{\infty}_c(\Omega),\quad \int_{\Omega} f(\xx) \partial_{x_i} v(\xx)\diff\xx =- \int_{\Omega} g_i(\xx) v(\xx)\diff\xx.

  Nous notons alors :math:`g_i = \partial_{x_i}f =\partial_{_i}f`, qui est unique en vertu du Corollaire :numref:`{number} <corollary-f-zero>`.


Nous noterons maintenant :math:`\partial_{x_i} f \in \Lo` ou :math:`\partial_{i} f \in \Lo` pour signifier que :math:`f` est dérivable au sens faible par rapport à :math:`x_i`. De la même manière, nous pouvons définir le gradient faible :

.. proof:definition::

  Une fonction :math:`f\in \Lo` admet un gradient faible, noté :math:`\nabla f`, si et seulement si :math:`f` est dérivable au sens faible par rapport à toutes ses variables, et nous avons alors
  
  .. math:: \nabla f = \left(\partial_{x_1}f, \partial_{x_2}f, \ldots, \partial_{x_d}f\right)^T.
  

Le lien entre *dérivée faible* et *dérivée forte* (ou *classique*) est maintenant présenté :

.. proof:proposition::

  Soit :math:`u\in\Cscr^1(\overline{\Omega})` tel que son gradient, au sens classique, :math:`\nabla u` soit dans :math:`\Cscr^0(\overline{\Omega})`, alors :math:`u` admet un gradient au sens faible :math:`\widetilde{\nabla} u` et l'on a :math:`\nabla u = \widetilde{\nabla} u`.


.. proof:proof::

  Il suffit de montrer ce résultat pour une direction uniquement, c'est-à-dire montrer que :math:`\widetilde{\partial_{i}}u = \partial_{i} u`, si :math:`\widetilde{\partial_{i}}` est la dérivée partielle au sens faible. Par intégration par partie, nous avons :

  .. math:: \forall v \in \Cscr^{\infty}_c(\Omega), \qquad \int_{\Omega} \partial_{i} u(\xx) v(\xx) \diff\xx= -\int_{\Omega} u(\xx) \partial_{i} v(\xx)\diff\xx,

  et par définition, nous avons :
  
  .. math:: \forall v \in \Cscr^{\infty}_c(\Omega), \qquad -\int_{\Omega} u(\xx) \partial_{i} v(\xx) = \int_{\Omega} \widetilde{\partial_{i}}u(\xx) v(\xx)\diff\xx. 

  Nous avons donc

  .. math:: \forall v \in \Cscr^{\infty}_c(\Omega), \qquad \int_{\Omega} (\partial_{i} u - \widetilde{\partial_{i}} u)(\xx) v(\xx)\diff\xx = 0,

  et nous concluons grâce au Corollaire :numref:`{number} <corollary-f-zero>`.


.. proof:remark::
  
  Dans la suite, puisque nous ne travaillerons qu'avec des dérivées partielles faibles, nous **omettrons le tilde**.


Espace de Sobolev :math:`\Ho`
-----------------------------

Nous disposons maintenant des outils nécessaires pour introduire l'espace de Sobolev :math:`H^1(\Omega)` des fonctions de carré intégrable et dérivables au sens faible dans chaque direction (:math:`d=2,3` est la dimension) :

.. math:: H^1(\Omega) = \enstq{u\in \Lo}{\nabla u \in (\Lo)^d}.

Nous munissons cet espace du produit scalaire suivant (pour :math:`u` et :math:`v` dans :math:`\Ho`)

.. math::  \PSH{u}{v} = \int_{\Omega} u(\xx)v(\xx) \;\diff\xx +\int_{\Omega} \nabla u(\xx) \cdot \nabla v(\xx) \;\diff\xx,

et de la norme induite, pour :math:`u\in\Ho` :

.. math:: \normH{u} =  \left(  \int_{\Omega} |u(\xx)|^2 \;\diff\xx +  \int_{\Omega} |\nabla u(\xx)|^2\;\diff\xx   \right)^{\frac{1}{2}}.


.. proof:remark::

  Nous pouvons montrer que c'est effectivement un produit scalaire avec les arguments similaires à ceux utilisés pour montrer que la "même" application est un produit scalaire sur :math:`\Cscr^1(\Omega)`.

.. proof:remark::
  
  Pour :math:`u` de :math:`\Ho`, nous avons clairement

  .. math::  
  
    \begin{aligned}
      \normH{u}^2 & = \normL{u}^2 + \sum_{i=1}^d\normL{\partial_{i} u}^2\\
        &= \normL{u}^2 + \normLd{\nabla u}^2,
    \end{aligned}

  et donc les inégalités suivantes :

  1. :math:`\normH{u}^2 \geq \normL{u}^2`
  2. :math:`\normH{u}^2  \geq \normLd{\nabla u}^2 = \sum_{i=1}^d\normL{\partial_i u}^2`
  3. :math:`\normH{u}^2   \geq \normL{\partial_i u}^2 \qquad \forall i=1,2,\ldots, d`




Nous montrons maintenant que :math:`\Ho` muni de cette norme est complet.

.. proof:theorem:: Complétude de :math:`\Ho`

  L'espace :math:`H^1(\Omega)` est complet pour la norme :math:`\normH{\cdot}`.

.. proof:proof::
  
  Prenons une suite de Cauchy :math:`(u_n)_n` de :math:`H^1(\Omega)` et montrons qu'elle converge dans :math:`H^1(\Omega)`. Par définition de la suite de Cauchy, nous avons

  .. math:: \forall \varepsilon > 0,\exists N>0\text{ tel que }\forall n > N, \forall p>N, \quad \normH{u_n-u_p}\leq \varepsilon.

  Par ailleurs, pour :math:`n,p` de :math:`\Nb` l'inégalité suivante est vérifiée :

  .. math::  \normL{u_n - u_p}\leq \normH{u_n - u_p},

  ce qui fait de la suite :math:`(u_n)_n` une suite de Cauchy dans :math:`\Lo`, puisque :
  
  .. math::  \forall \varepsilon > 0,\exists N>0\text{ tel que }\forall n > N, \forall p>N, \quad \normL{u_n - u_p}\leq \normH{u_n-u_p}\leq \varepsilon.

  L'espace :math:`\Lo` étant complet, la suite :math:`(u_n)_n` converge dans :math:`\Lo` vers :math:`u\in \Lo`. Nous appliquons le même raisonnement aux dérivées partielles : pour :math:`i= 1,\ldots, d`, nous avons aussi

  .. math:: \normL{\partial_i u_n - \partial_i u_p}\leq \normH{u_n -  u_p}.

  Ainsi, pour tout :math:`i`, la suite :math:`(\partial_i u_n)_n` est aussi de Cauchy dans :math:`\Lo` et converge donc vers un élément :math:`f_i\in \Lo`. Il nous faut donc montrer que :math:`u` est dérivable (au sens faible) et que :math:`f_i = \partial_i u`. Remarquons pour cela que, par définition,

  .. math:: \forall \varphi \in \Cscr^{\infty}_c(\Omega),\qquad \int_{\Omega}\partial_i u_n (\xx)\varphi(\xx) \diff\xx= -\int_{\Omega} u_n(\xx) \partial_i \varphi(\xx)\diff\xx. 

  En passant à la limite dans :math:`\Lo` dans cette expression, il vient que : 

  .. math:: \forall \varphi \in \Cscr^{\infty}_c(\Omega),\qquad \int_{\Omega} f_i (\xx)\varphi(\xx) \diff\xx= -\int_{\Omega} u(\xx) \partial_i \varphi(\xx)\diff\xx. 

  Autrement dit, :math:`u` est dérivable par rapport à toutes ses variables et :math:`\partial_i u = f_i`, ce qui implique que :math:`u` est bien dans :math:`H^1(\Omega)`. Nous avons donc montré que la suite :math:`(u_n)_n` converge dans :math:`\Lo` vers un élément :math:`u` de :math:`\Ho`. Il nous reste à montrer que cette convergence est toujours valable pour la norme de :math:`\Ho`. Utilisons la remarque précédente pour décomposer la norme dans :math:`\Ho` :

  .. math:: \normH{u_n - u}^2 = \normL{u_n - u}^2 + \sum_{j=1}^d \normL{\partial_{j} u_n - \partial_{j} u}^2 \to 0 (n \to +\infty).

  La suite de Cauchy :math:`(u_n)_n` est donc convergente dans :math:`H^1(\Omega)`, ce dernier est donc complet.


Nous en déduisons le corollaire suivant:

.. proof:corollary::
  
  :math:`H^1(\Omega)` est un espace de Hilbert pour le produit scalaire :math:`\PSH{\cdot}{\cdot}`.

Nous avons également le résultat de densité suivant

.. proof:proposition::
  
  L'espace :math:`\Cscr^{\infty}_c(\Omega)` est dense dans :math:`H^1(\Omega)` pour la norme :math:`\normH{\cdot}`.

En particulier, l'espace :math:`\Cscr^{1}(\Omega)`, qui contient :math:`\Cscr^{\infty}_c(\Omega)`, est dense dans :math:`H^1(\Omega)` pour la norme :math:`\normH{\cdot}`. Ce résultat nous dit que :math:`H^1(\Omega)` est le "plus petit" espace complet contenant :math:`\Cscr^{1}(\Omega)` : c'est ce que nous cherchions !

