
Formulation Faible
==================

Domaine Physique
----------------


.. figure:: /img/normal/normal.*
  :figwidth: 100%
  :width: 100%
  :alt: Exemple de domaine de calcul avec sa normal unitaire sortante
  :align: center

  Exemple de domaine de calcul avec sa normal unitaire sortante

Dans ce cours, nous considérons un ouvert polygonal :math:`\Omega` de :math:`\Rb^2`. Nous restons en dimension 2 pour plus de facilité mais l'extension à la dimension 3 est relativement directe et tous les résultats énoncés sont aussi valable en dimension 3. Sur chaque segment du bord :math:`\Gamma := \partial\Omega` du domaine, on définit le vecteur unitaire normale :math:`\nn` sortant à :math:`\Omega`. Nous noterons que ce vecteur n'existe pas aux intersections entre les segments. Le domaine :math:`\Omega` est supposé ne pas comporter de fissure ni de point de rebroussement. Son bord est divisé en deux parties distinctes: :math:`\GammaD` et :math:`\GammaN`, potentiellement non connexe mais d'intersection vide: :math:`\Gamma = \overline{\GammaD}\cup\overline{\GammaN}` et :math:`\GammaD\cap\GammaN=\emptyset`. Selon la partie du bord, une condition sera imposée à la solution :


* Sur :math:`\GammaD` : *condition de Dirichlet*, c'est à dire que la valeur de la solution y est imposée (\eg :math:`u = 0`). En mécanique on dirait que le déplacement est imposée.
* Sur :math:`\GammaN` : *condition de Neumann*, c'est à dire que le flux de la solution y est imposée (\eg :math:`\dn u = 0`).  En mécanique, on dirait que la force normale est imposée.

.. prf:remark::

  En général, on préfère travailler avec des ouverts *réguliers*, de classe au moins :math:`\Ccal^1`. Un tel ouvert présente l'avantage de pouvoir clairement définir le vecteur unitaire normale :math:`\nn` sortante à :math:`\Omega`. Cependant, après maillage, on se retrouve avec... un polygone ! Alors plutôt que de travailler dans un domaine régulier pour après le casser en (petits) morceaux, nous préférons ici commencer directement avec un polygone et mettre l'accent sur les algorithmes et la mise en oeuvre de la méthode que les spécificités mathématiques.


.. prf:remark::

  Un point :math:`\xx \in \Rb^2` est parfois noté  :math:`\xx = (x,y)` ou :math:`\xx = (x_1,x_2)` selon les besoins. Nous commencerons les indiçages par 1 bien qu'en informatique cela commence souvent par 0.

EDP (problème fort)
-------------------

Ce cours se concentre sur les équations aux dérivées partielles (EDP) elliptiques du second ordre, qui font appel à l'opérateur de Laplace [#]_ (ou *Laplacien*) :

.. math::   \Delta := \frac{\partial^2}{\partial x} + \frac{\partial^2}{\partial y} = \frac{\partial^2}{\partial x_1} + \frac{\partial^2}{\partial x_2}.

Nous considérons le problème générique suivant, appelé aussi problème de réaction-diffusion :

.. math::
  :label: eq-pbmodel

  \left\{\begin{array}{r c l l}
    -\Delta u + u  & = & f & (\Omega),\\
    \dn u & = & 0 & (\Gamma), 
  \end{array}\right.

où nous avons défini :

- le terme :math:`\dn u` désigne la *dérivée normale* de :math:`u` sur le bord, c'est à dire la dérivée de :math:`u` dans la direction :math:`\nn` : :math:`\dn u = (\nabla u)\cdot\nn`, avec :math:`\nabla u = [\partial_{x_1}u, \partial_{x_2}u]^T` son vecteur gradient. Vous aurez sans doute remarqué que, entre deux arêtes, le vecteur normal :math:`\nn` n'est pas défini et donc la dérivée normale non plus. Ce "problème" n'en est pas vraiment un et pour l'instant mettez cela de côté, nous y reviendrons !
- :math:`(-\Delta u)` : Terme de diffusion (notez le signe négatif)
- :math:`\dn u=0` : **Condition de Neumann homogène**
- :math:`f` : une fonction donnée définie sur :math:`\Omega`. Elle joue le rôle de *terme source*, c'est à dire d'apport (positif ou négatif), par exemple de chaleur ou de force surfacique.

.. TODO
  \begin{figure}
    \begin{subfigure}[b]{.5\linewidth}
      \centering   \includestandalone{img/cond_dirichlet}
      \caption{Condition de Dirichlet : la valeur est imposée.}
      \label{fig:Dirichlet}
    \end{subfigure} 
    \begin{subfigure}[b]{.5\linewidth}
      \centering \includestandalone{img/cond_neumann}
      \caption{Condition de Neumann : le flux est imposé.}
      \label{fig:Neumann}
  \end{subfigure}     
  \caption{Conditions de Neumann et de Dirichlet}
  \end{figure}


Pour le moment, nous ne nous intéressons pas à la régularité de la solution ni même à l'existence et l'unicité de celle-ci : nous supposons que le problème :eq:`eq-pbmodel` est bien posé. Une fois la méthode des éléments finis apréhendée, nous nous intéresserons à ces questions. Cela va à l'encontre de l'habitude en mathématiques où l'on démontre le caractère bien posé avant de s'y attaquer. Faites moi confiance et tout s'éclairera !

.. prf:remark::

  Pour l'instant, nous imposons une condition aux bords que nous imposons, de type Neumann homogène. Plus tard nous verrons d'autres types de conditions : Dirichlet, où la valeur de solution est imposée, et Fourier, un mélange entre Dirichlet et Neumann.

Théorème de Green
-----------------

Pour une géométrie arbitraire, nous ne savons pas, en général, obtenir **la solution forte** (ou classique) du problème :eq:`eq-pbmodel`. La méthode des éléments finis se base sur l'approximation numérique de **la solution au sens faible** du problème  :eq:`eq-pbmodel`. Nous verrons qu'une solution *faible* est, en fait et en général, *forte*. Commençons par réécrire le problème d'origine sous sa formulation faible ou formulation variationnelle.


Un théorème central dans l'analyse des EDP et qui permet d'obtenir ces formulations faibles est celui de Green [#]_

.. math:: \forall u,v,\qquad  \int_{\Omega} (\Delta u)(\xx) v(\xx)\diff\xx   = - \int_{\Omega} \nabla u(\xx)  \cdot\nabla v(\xx)\diff\xx  + \int_{\Gamma} (\dn u)(\xx)  v(\xx)  \diff s(\xx).


Ce résultat est également valable en dimension 3 pour des domaines polygonaux (ouf). Le produit :math:`\nabla u \cdot\nabla v` est le produit scalaire euclidien standard. La quantité :math:`v` est ici laissé non définie, c'est normal : supposez que c'est une fonction de même régularité que :math:`u`. Pour compacter les équations, nous n'indiquerons plus les quantités d'intégrations :

.. math:: \forall u,v,\qquad  \int_{\Omega} (\Delta u) v  = - \int_{\Omega} \nabla u \cdot\nabla v + \int_{\Gamma} (\dn u) v.


.. prf:remark::

  Ce résultat est en quelque sorte une extension multi-dimensionnel de l'intégration par partie sur un segment  :math:`\Omega = [a,b]`. En effet, en dimension 1, l'opérateur :math:`\Delta` devient la dérivée seconde. La normale sortante au segment devient un scalaire valant -1 "à gauche" (en :math:`a`) et 1 "à droite" (en :math:`b`) et la dérivée normale devient :math:`\dn u = \pm u'` :
  
  .. math::  \int_{a}^b u'' v  = - \int_{a}^b u' v' +  u'(b)v(b) - u'(a)v(a) = - \int_{a}^b u' v'  + \dn u(b)v(b)+ \dn u(a)v(a).

Formulation faible
------------------

Le point de départ de notre analyse est la réécriture sous forme faible du problème :eq:`eq-pbmodel`. Pour cela, la méthode consiste à :

- **Multiplier** l'EDP par une **fonction test** :math:`v`
- **Intéger** le tout sur :math:`\Omega`
- Appliquer le **Théorème de Green**
- Appliquer les **conditions aux bords**

.. math::

  \begin{aligned}
    -\Delta u + u=f \implies & -\int_{\Omega} \Delta u v + \int_{\Omega}uv = \int_{\Omega}fv\\
    \implies &\int_{\Omega}\nabla u \cdot\nabla - \int_{\Gamma} \underbrace{(\dn u)}_{=0} v + c\int_{\Omega}uv = \int_{\Omega}fv 
  \end{aligned}

Nous obtenons alors :

.. math::
  :label: eq-faible

  -\Delta u + u=f \quad (\Omega)\implies \forall v, \quad  \int_{\Omega}\nabla u \cdot\nabla v+ \int_{\Omega}uv = \int_{\Omega}fv.


Ainsi, et toujours sans regarder la régularité de :math:`u` (ni de :math:`v`), nous avons que : si :math:`u` est solution de l'EDP :eq:`eq-pbmodel` alors :math:`u` est aussi solution de la formulation faible :

.. math::
  
  \left\{
    \begin{aligned}
      &\text{Trouver } u \text{ tel que }\\
      &\forall v, \quad \int_{\Omega}\nabla u \cdot\nabla v+ \int_{\Omega}uv = \int_{\Omega}fv.
    \end{aligned}
  \right.


À gauche du signe égal se trouve l'inconnue (:math:`u`) et à droite la donnée (:math:`f`), c'est une convention et plus tard cette équation s'écrira sous la forme d'un système linéaire :math:`AU = B` où le vecteur :math:`B` correspondra au membre de droite de :eq:`eq-faible` et la matrice :math:`A` à la partie de gauche.

.. prf:remark::

  Attention, sur le bord :math:`\Gamma`, :math:`\dn u= 0` n'implique pas :math:`u = 0` !

Nous pouvons maintenant définir plus proprement la quantité :math:`v`. Appelée *fonction test* elle n'a d'autre rôle que de "tester" la solution. L'idée de la formulation faible est de chercher une solution qui vérifie l'EDP, non pas point à point (au sens fort, donc) mais "en moyenne", via l'intégrale. En mécanique, :math:`v` est appelé "travaux virtuels" (avec la méthode éponyme qui est, en fait, la formulation faible) : cette quantité est arbitraire et n'est utile que pour écrire le problème faible :eq:`eq-faible`.

.. Les conditions de Dirichlet et de Neumann sont imposées différemment : la condition de Neumann apparait naturellement dans la formulation faible, en remplaçant simplement :math:`\dn u` par sa valeur, c'est pourquoi on parle de *condition naturelle*. À l'inverse, la condition de Dirichlet est dite *condition essentielle* et est imposée à la solution ou plutôt, à l'espace fonctionnel contenant la solution.

..   Espace Fonctionnel
  ------------------

  Délimitons maintenant et avec plus de précisions les espaces fonctionnels auxquels :math:`u` et :math:`v` appartiennent. Comme nous cherchons :math:`u` sous la forme d'une solution faible, nous n'avons pas besoin d'imposer à :math:`u` d'être continu, ni même de posséder une valeur en chaque point de l'espace. C'est pour cela que nous travaillerons avec des fonctions de carré intégrable et l'espace :math:`\Lo` :

  .. math::  \Lo = \enstq{f\colon \Omega\to\Rb}{\int_{\Omega}\abs{f}^2 < \infty},

  avec son produit scalaire usuel et sa norme qui en dérive

  .. math::  \PSL{u}{v} =\int_{\Omega}uv \qquad \normL{u}^2=\int_{\Omega}\abs{u}^2.
    
  Cet espace n'est pas suffisant car nous avons besoin de dériver :math:`u` et :math:`v` dans la formulation faible. Nous introduisons alors l'espace de Sobolev [#]_

  .. math::  \Ho = \enstq{f\in\Lo}{\partial_{x_i}f \in\Lo, \forall i=1,\ldots,d},

  et lui associons son produit scalaire et sa norme dérivée

  .. math::

    \begin{aligned}
      \PSH{u}{v} &= \int_{\Omega} uv  + \int_{\Omega}\nabla u\cdot\nabla v &\normH{u}^2 &= \int_{\Omega}\abs{u}^2 + \int_{\Omega} \norm{\nabla u}^2 \\ 
                &= \PSL{u}{v}  + \PS{\nabla u}{\nabla v}_{(\Lo)^d}  & &=\normL{u}^2 + \norm{\nabla u}_{(\Lo)^d}^2
    \end{aligned}



  .. prf:remark::
    
    Les espaces de Sobolev sont aussi appelés espace d'énergie : les quantités qui le composent sont *d'énergie finie* et ont plus de liberté que les fonctions continues, elles peuvent par exemple (et sous conditions) être singulière en certains points, comme l'énergie.


  .. prf:remark::

    Si vous n'avez encore jamais rencontré ces espace de Sobolev, comme :math:`\Ho`, il doivent vous sembler contradictoires avec tout ce que vous avez appris jusque là, notamment par la présence de la dérivée :math:`\partial_{x_i}f \in\Lo`. Une fonction de :math:`\Lo` n'est déjà pas forcément continue ni même définie en tout point, alors comment peut-elle être dérivable ?  Prendre la restriction d'une fonction :math:`\Ho` sur :math:`\GammaD`, une partie du bord, n'a pas non plus de sens *à ce niveau de lecture du cours*. En effet, nous savons qu'un élément de :math:`\Lo` est en fait une classe de fonction et en prendre sa valeur sur un point une une ligne n'a pas de sens a priori.

    Mathématiquement, la dérivée qui apparait ici n'est pas la dérivée *au sens classique* mais *au sens faible*, que nous définirons plus tard. Cependant, si les dérivées au sens classique et au sens faible existent, alors elles sont identiques. De plus et en pratique, toutes les fonctions que nous verrons seront (très) régulières c'est pourquoi, pour le moment, vous pouvez faire "comme si" ce sont des dérivées classiques et accepter que les espace :math:`\Lo` et :math:`\Ho` "ressemblent" aux espaces :math:`\Cscr^0(\overline{\Omega})` et :math:`\Cscr^1(\overline{\Omega})`.


  Formulation Variationnelle dans les Sobolev
  -------------------------------------------

  Nous écrivons maintenant la formulation faible dans les bons espaces :

  .. math:: 

    \left\{
    \begin{array}{l}
      \text{Trouver } u \in\Ho \text{ tel que }\\
      u = \gD \quad \text{ sur } \GammaD\\
      \displaystyle \int_{\Omega}\nabla u \cdot\nabla v+ c\int_{\Omega}uv = \int_{\Omega}fv +  \int_{\GammaN} \gN v, \quad \forall v \in \Ho \text{ tel que } v|_{\GammaD}=0.
    \end{array}
    \right.


  Nous remarquons que dans cette formulation faible, :math:`v` et :math:`u` satisfont tous deux une conditions de Dirichlet mais différentes : hétérogène pour :math:`u` et homogène pour :math:`v`, mais tous deux appartiennent à :math:`\Ho`. Les données doivent, de leur côté, appartenir aux espaces suivants :

  .. math::

    f \in \Lo, \qquad
    \gN \in L^2(\GammaN),\qquad
    \gD \in H^{1/2}(\GammaD).

  L'espace :math:`L^2(\GammaN)` est l'espace des fonctions de carré intégrable sur :math:`\GammaN` (intégrale 1D). Le dernier espace est assez particulier. Il s'agit de l'espace des restrictions sur :math:`\GammaD` des fonctions de :math:`\Ho`. Autrement dit, si :math:`g_0\in H^{1/2}(\GammaD)`, alors il existe :math:`v_0\in\Ho` telle que :math:`v_0|_{\GammaD} = g_0`.

.. raw:: html

  <div id="app-weak-formulation" class="app-container">
  <p>Même si nous n'avons pas encore parcouru toutes les conditions aux limites possibles, l'application ci-dessous (hautement inspiré des apps développées par <a href="http://minapecheux.com/wp/">Mina Pêcheux</a>), permet de comprendre l’influence des conditions aux limites et des autres paramètres sur la "forme" de la formulation faible :</p>
  <iframe id="iframe-weak-formulation" class="app-content" src='../../../_static/app/weak-formulation/index.html' scrolling="no"></iframe>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.1/iframeResizer.min.js" integrity="sha512-ngVIPTfUxNHrVs52hA0CaOVwC3/do2W4jUEJIufgZQicmY27iAJAind8BPtK2LoyIGiAFcOkjO18r5dTUNLFAw==" crossorigin="anonymous"></script>
  <script>
  iFrameResize({}, '#iframe-weak-formulation')
  </script>



.. [#] Pierre-Simon Laplace (1749 -- 1827).
.. [#] George Green (1793 -- 1841). Mathématicien britannique (quasi) auto-didacte.
.. [#] Du nom de son découvreur, Sergei Sobolev (1908 -- 1989), mathématicien Russe.
