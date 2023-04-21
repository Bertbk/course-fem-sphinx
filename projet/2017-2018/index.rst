
.. _projet-wifi:

2017 - 2018 : Wi-Fi
===================

Ce projet propose d'étudier la propagation des ondes Wi-Fi dans un appartement de :math:`35\mathrm{m}^2`. Nous ferons appels aux logiciels GMSH, pour la gestion du maillage et la visualisation, et FreeFem++ pour la résolution par éléments finis. Le sujet est décomposé en trois parties : la théorie (le modèle), l'implémentation et l'étude des résultats.

Équation de Helmholtz
---------------------

La définition `Wikipédia <https://fr.wikipedia.org/wiki/Onde>`_ d'une onde est la suivante :

  Une onde est la propagation d'une perturbation produisant sur son passage une variation réversible des propriétés physiques locales du milieu. Elle se déplace avec une vitesse déterminée qui dépend des caractéristiques du milieu de propagation. Une onde transporte de l'énergie sans transporter de matière.

Mathématiquement, une onde :math:`\mathscr{E}(\xx,t)` dépend du temps :math:`t` et de l'espace :math:`\xx`, et vérifie l'équation des ondes :

.. math:: \Delta \mathscr{E}(\xx,t) = \frac{1}{c^2}\frac{\partial^2 \mathscr{E}}{\partial t^2}(\xx,t),

où :math:`\Delta = \sum_{j=1}^3\frac{\partial^2}{\partial x_j^2}` est l'opérateur Laplacien (spatiale) et :math:`c` est la célérité de l'onde dans le milieu (peut dépendre de :math:`\xx` !). Par exemple, dans le cas d'une onde électromagnétique et dans le vide, :math:`c` est la célérité de la lumière, soit :math:`299792458\mathrm{m.s}^{-1}`. La quantité :math:`\xx` est un vecteur de dimension :math:`d=2` ou :math:`d=3` selon le problème considéré : dans notre cas :math:`d=2`. 

Lors d'une excitation périodique, c'est-à-dire lorsque la pulsation :math:`\omega` (en :math:`\mathrm{rad.s}^{-1}`) de l'onde est fixée, l'onde s'écrit alors :math:`\mathscr{E}(\xx,t) = \Re\left(u(\xx)e^{-\imath \omega t}\right)` où :math:`\imath=\sqrt{-1}` et :math:`E` est une **onde spatiale** satisfaisant l'équation de Helmholtz :

.. math:: \Delta E + \frac{\omega^2}{c^2}E = f.

Cette équation s'obtient en remplaçant :math:`\mathscr{E}(\xx,t)` par :math:`E(\xx)e^{-\imath \omega t}` dans l'équation des ondes. Nous notons en général :math:`k = \frac{\omega}{c}` (en :math:`\mathrm{rad.m}^{-1}`) le nombre d'onde et :math:`\lambda = \frac{2\pi}{k}` (en :math:`\mathrm{m}`) la longueur d'onde, autrement dit, la distance entre deux amplitudes, de sorte que l'équation de Helmholtz s'écrit

.. math:: \Delta E + k^2E = f.

Les ondes Wi-Fi  qui suivent `la norme IEEE 802.11g <https://fr.wikipedia.org/wiki/IEEE_802.11>`_ sont émises à une fréquence variant de :math:`2.4\mathrm{GHz}` à :math:`2.5\mathrm{GHz}`. Dans notre projet, nous nous limiterons à des ondes de fréquence :math:`2.4\mathrm{GHz}` \textbf{si votre machine vous le permet !} En effet, les simulations de propagation d'ondes sont parmis les plus coûteuses en terme de CPU. Si votre machine n'est pas assez puissante, nous prendrons une onde de fréquence plus faible, comme :math:`1\mathrm{GHz}` voire moins.

.. exercise::

  Sachant que :math:`\omega=2\pi F` où :math:`F` est la fréquence, en Hertz (:math:`\mathrm{Hz}`), calculez le nombre d'onde :math:`k` et la longueur d'onde :math:`\lambda` dans le vide, pour une onde électromagnétique et pour :math:`F=2.4\mathrm{GHz}` et :math:`F=1\mathrm{GHz}`.


Modèle
------

Entre les murs
++++++++++++++

Nous notons :math:`\Omega` l'appartement tout entier dans lequel est situé notre routeur. Les murs sont supposés être du même matériau : du placo-plâtre. Le domaine :math:`\Omega` est décomposé en deux domaines :

.. math:: \Omega = \Omega_{\text{air}}\cup\Omega_{\text{mur}},

où :math:`\Omega_{\text{air}}` est l'intérieur de l'appartement, composé d'air (nous le supposerons vide de meubles), et :math:`\Omega_{\text{mur}}` contient les murs en placo-plâtre. Nous ne prendrons pas en compte les appartements voisins au nôtre. De plus, nous nous limiterons à la dimension :math:`2` de l'espace.

L'air est modélisé comme étant le vide : :math:`c_{\mathrm{air}} = c`,  tandis que, pour les murs en placo-plâtre, nous avons :math:`c_{\mathrm{placo}} = \frac{c}{2.4}`. Plutôt que de rendre le nombre d'onde dépendant de l'espace, nous introduisons la **fonction de contraste** :math:`n` définie par:

.. math:: n(\xx) =
  \left\{
    \begin{array}{l l l}
      1 & \text{ si } \xx\in\Omega_{\text{air}} & (\text{i.e. } \xx \text{ est dans l'air}),\\
      2.4 & \text{ si } \xx\in\Omega_{\text{mur}} & (\text{i.e. } \xx \text{ est dans le mur}).\\
    \end{array}
  \right.

Nous modifions alors l'équation de Helholtz ainsi :

.. math:: \Delta E(\xx) + k^2n(\xx)^2 E(\xx) = f(\xx) \qquad \forall\xx\in\Omega.

Le nombre d'onde :math:`k` est donc ici celui de l'air (ou du vide).

Le routeur : la fonction :math:`f`
++++++++++++++++++++++++++++++++++

Idéalement, le routeur devrait être modélisé comme un point source et donc mathématiquement par la distribution de Dirac :math:`\delta_{\mathbf{x}_s}` centré sur la position :math:`\mathbf{x}_s` du routeur.  L'équation à résoudre serait alors :

.. math:: \Delta E(\xx) + k^2n(\xx)^2 E(\xx) = -\delta_{\mathbf{x}_s}.

Cependant nous ne pouvons pas utiliser de distribution de Dirac avec la méthode des éléments finis (car :math:`\delta_{\mathbf{x}_s}\not\in L^2(\Omega)`). Nous  modélisons alors le routeur par un disque :math:`\Omega_{s}` de rayon :math:`\varepsilon_s = 0.1` et de centre :math:`\mathbf{x}_s = (x_s,y_s)` et la distribution :math:`\delta_{\mathbf{x}_s}` est approchée par la **fonction chapeau** :math:`f_s` définie par

.. math:: \forall \xx\in\Omega,\qquad f_s(\xx) =
  \left\{
    \begin{array}{l l}
      \dsp \frac{3}{\pi\varepsilon_s^2}\left(1-\frac{\|\mathbf{x}_s - \xx\|}{\varepsilon_s}\right) & \text{ si }\xx\in\Omega_{s},\\
      0 & \text{ sinon.}
    \end{array}
  \right.

La fonction :math:`f_s` est d'intégrale totale égale à :math:`1` et quand :math:`\varepsilon_s` tend vers :math:`0`, la suite de fonction :math:`(f_s)_{\varepsilon_s}` tend vers la distribution de Dirac :math:`\delta_{\mathbf{x}_s}`.

.. exercise::

  Montrez que :

  .. math:: \int_{\Omega} f_s(\xx)\diff \xx = 1.

  Pour simplifier, on pourra se placer dans le cas où :math:`\Omega_{s}` est centré en :math:`(0,0)` et utiliser un changement de coordonnées adéquat.


Réflexions parasites
++++++++++++++++++++

Sur le bord extérieur de notre appartement, nous souhaitons que l'onde ne se réfléchisse pas, pour cela nous imposons la condition aux limites suivantes:

.. math:: \dn E(\xx) - \imath k n(\xx) E(\xx) = 0, \qquad \text{ sur }\partial\Omega.

Cette condition est une approximation de la condition non réfléchissante **exacte** : l'onde sera légèrement réfléchie, toutefois la mise en \oe{}uvre d'une telle condition reste très simple et peu coûteuse, ce qui explique que nous l'utilisions. Notez que :math:`\nn` est le vecteur normale unitaire sortant à :math:`\Omega` (ne pas confondre avec :math:`n` la fonction de constraste).

Le système à résoudre
+++++++++++++++++++++

Au final, le système que nous devons résoudre est le suivant. Nous cherchons l'onde spatiale \textbf{complexe} :math:`E`, telle que, pour :math:`k = \omega/c` donné, elle vérifie :


.. math::
  :label: eq-helmholtz

  \left\{
    \begin{array}{r c l l}
      \Delta E(\xx) + k^2n(\xx)^2E(\xx)  &= & -f_s(\xx) & \text{ dans } \Omega,\\
      \dn E(\xx) - \imath k n(\xx) E(\xx) & = & 0 & \text{ sur }\partial\Omega.
    \end{array}
  \right.

Formulation variationnelle
++++++++++++++++++++++++++


.. exercise::

  Montrez que la formulation variationnelle du problème (\ref{eq:helmholtz}) s'écrit

  .. math:: 
    :label: eq-fv

    \left\{
      \begin{array}{l}
        \text{Trouver }u\in\Ho\text{ tel que }\\
        \forall v\in\Ho,\quad a(u,v) = \ell(v),
      \end{array}
    \right.

  avec
  
  .. math::
  
    \begin{aligned}
      a(u,v) &= -\int_{\Omega}\nabla E(\xx)\cdot\overline{\nabla v(\xx)}\diff\xx + \int_{\Omega}k^2n(\xx)^2E(\xx)\overline{v(\xx)}\diff\xx    +  \int_{\partial\Omega}\imath kn(\xx)E(\xx)\overline{v(\xx)}\diff\xx,\\
    \ell(v) &= -\int_{\Omega}f_s(\xx)\overline{v(\xx)}\diff\xx.
    \end{aligned}

    
.. exercise::

  Montrez que les applications :math:`a(\cdot,\cdot)` et :math:`\ell(\cdot)` sont continues sur respectivement :math:`\Ho\times\Ho` et :math:`\Ho`.

Malheureusement pour nous, :math:`a(\cdot,\cdot)`  n'est pas coercive : nous ne pouvons pas appliquer le Théorème de Lax-Milgram et de ses corollaires. Nous admettrons le Théorème suivant

.. prf:theorem::

  Les problèmes :eq:`eq-helmholtz` et :eq:`eq-fv` admettent une unique solution.

  
Implémentation
--------------

Le pas de maillage
++++++++++++++++++

Pour résoudre des problèmes de propagation d'ondes, le pas de maillage (ou la finesse de maillage), noté :math:`h` (diamètre du plus grand élément), dépend du nombre d'onde :math:`k`, ou plutôt, de la longueur d'onde :math:`\lambda = 2\pi/k`. En effet, si nous ne prenons pas assez de points de discrétisation, l'onde ne sera pas suffisamment approchée comme le montre :numref:`la Figure {number} <fig-shanon>`. Cela rejoint le Théorème de Shanon d'échantillonage.

En pratique, nous prenons un nombre de points :math:`10 \leq n_{\lambda} \leq 20` par longueur d'onde. Autrement dit, nous avons, si :math:`h` est la taille caractéristique d'un élement :

.. math::   h = \frac{\lambda}{n_{\lambda}}=  \frac{2\pi}{kn_{\lambda}}.

Il faudra veiller, lors de nos simulations, à ce que :math:`n_{\lambda} = 10` \textbf{au minimum}. Pour les simulations finales à haute fréquence, il vaut mieux privilégier :math:`n_{\lambda} = 15` ou :math:`n_{\lambda}=20`, si la machine le permet.


.. prf:remark::

  Avant de lancer un calcul et/ou un maillage pour tester (*i.e* mon code plante-il ?) : choisissez un nombre d'onde faible ! Par exemple :math:`k= 10` ou :math:`k=5` (mais pas :math:`k=0` !).

.. _fig-shanon:

.. figure:: /img/projet-wifi/wave_mesh_coarse.*
  :figwidth: 100%
  :width: 75%
  :alt: Echantillonage d'une onde
  :align: center

  Illustration d'un échantillonage trop faible en 1D : la solution discrète est linéaire et non oscillante ! Elle est trop éloignée de la solution exacte. Nous avons besoin de plus de points de discrétisations.



L'appartement : GMSH
++++++++++++++++++++


.. _fig-plan:

.. figure:: /img/projet-wifi/plan.*
  :figwidth: 100%
  :width: 100%
  :alt: Plan de l'appartmeent
  :align: center

  Plan de l'appartement (en mètre). Rappelons que :math:`\Omega = \Omega_{\text{air}}\cup\Omega_{\text{mur}}` et :math:`\partial\Omega` est le bord "externe" de l'appartement.

Le plan de l'appartement que nous considérons est donné par :numref:`la Figure {number} <fig-plan>` où chaque dimension est exprimée en mètre. Nous proposons les contraintes suivantes sur l'appartement : sa longueur :math:`L` est fixée à 7, sa largeur :math:`\ell` à 5 et l'épaisseur :math:`d` des murs est égale à 0.2.

.. exercise::

  Implémentez un code GMSH qui reproduit le plan de :numref:`la figure {number} <fig-plan>`, en respectant las consignes suivantes :
  
  1. Nous devons être en mesure de pouvoir modifier via l'interface graphique les quantités suivantes :
    - Le nombre de points  :math:`n_{\lambda}` de discrétisation par longueur d'onde :math:`\lambda`. N'oubliez pas que :math:`n_{\lambda}` est un entier.
    - La position du routeur :math:`\mathbf{x}_s` (**Il n'est pas nécessaire de contraindre/vérifier sa position par rapport aux murs (mais par rapport aux dimensions de l'appartement, oui !), nous supposerons l'utilisateur suffisamment malin pour cela**)
    - Remarque : dans la version originale du projet, il était demandé de pouvoir modifier les dimensions des pièces et donc de pouvoir déplacer les murs.
  2. La largeur des portes est fixées à :math:`80\mathrm{cm}`.
  3. Le rayon de :math:`\Omega_{s}` est fixé à :math:`0.1\mathrm{cm}`.
  4. Tous les murs sont de même épaisseur :math:`d`.

  

.. prf:remark::
  
  À vous de définir les entités :code:`Physical` qui vous semblent d'importance ainsi que les dimensions des pièces.

La formulation variationnelle : FreeFem++
+++++++++++++++++++++++++++++++++++++++++

.. exercise::

  Rédigez le code \freefem permettant de résoudre le problème :eq:`eq-fv` dans le maillage réalisé par \gmsh. Les quantités en sorties qui nous intéressent sont :

  - Le champ :math:`u` : partie réelle et partie imaginaire, dans tout l'appartement.
  - La valeur absolue du champ : :math:`\abs{u}`, dans tout l'appartement.

.. prf:remark::
  
  Plusieurs remarques :

  - Vous pouvez rédiger un script qui modifie  le nombre d'onde :math:`k` dans le(s) fichier(s) \freefem et \gmsh, puis lance \gmsh et \freefem... En bref : vous êtes libre de geeker comme bon vous semble.
  - En phase de test, rappelez-vous de \textbf{ne pas lancer} de résolution du problème pour un :math:`k` élevé.
  - Mettez la solution à l'échelle : faites en sorte que le maximum de la solution soit égale à :math:`1`.   
  - La solution que l'on calcule présente très certainement un pic au niveau du routeur, qui empêche de visionner correctement la solution en dehors de celui-ci. Il peut, dès lors, être intéressant de regarder la solution obtenue **partout en dehors** du routeur et/ou de modifier la *range* de couleur.

Étude et examen oral
--------------------

Maintenant que nous disposons d'un code qui permet de résoudre le problème de propagation d'ondes Wi-Fi dans un appartement, nous pouvons le tester.


Il n'y a ici plus d'exercice à proprement parler : à vous d'effectuer les simulations qui vous paraissent intéressantes et de sauvegarder les résultats issus de ces résolutions en vue de les présenter à l'oral. La qualité  des réponses et le nombre de questions traitées seront pris en compte. Soyez rigoureux/rigoureuses et précis(es) : notez scrupuleusement les paramètres utilisés, ne vous embrouillez pas entre les différentes simulations, sauvegardez les fichiers images et les fichiers de données, ... 

Nous donnons ici quelques idées de questions à se poser :


- Si le routeur est situé obligatoirement dans le salon et le long du mur "gauche", peut-on lui trouver une place pour pouvoir toujours être connecté au Wi-Fi tout en étant aux toilettes ? (nous pouvons par exemple supposer qu'en deça de :math:`25\%` de la puissance max, la réception n'est pas suffisante pour glander sur youtube).
- À défaut de trouver l'optimal, quel serait un bon emplacement pour le routeur, pour obtenir du réseau Wi-Fi partout ?
- Sachant que l'indice :math:`n` du béton est de l'ordre de :math:`7`. Que se passe-t-il si un des murs de l'appartement est en béton (mur porteur) ? Pouvons-nous obtenir une cartographie des différences entre la solution avec mur en placo et avec un mur porteur ?
- Influence du pas de maillage sur la solution ?
- Que se passe-t-il si les murs deviennent comme de l'air (:math:`n(\Omega_{\text{mur}})=1)`) ? Pouvons nous obtenir une cartographie des différences entre la solution avec mur en placo et mur "en air" ?
- Et si les murs étaient en béton (:math:`n=7`) ?
- Et si c'était **votre** appartement ?
- ...



Réfléchissez également à d'autres questions plus théoriques et essayez d'apporter des réponses, comme par exemple 

- Quelle sont les limites du modèle ?
- Que et comment pourrions nous améliorer notre modèle et notre code si nous disposions d'une machine de puissance infinie ?
- Quelles améliorations, du point de vue géométrique, pouvons-nous apporter à notre appartement ?


Plus que l'obtention de réponse "parfaite", ce sera votre capacité et votre volonté de recherche qui seront pris en compte.

Résultat
--------

Exemple
+++++++

:numref:`La figure {number} <fig-wifi>` illustre un exemple de ce que l'on peut obtenir.

.. _fig-wifi:

.. figure:: /img/projet-wifi/wifi/wifi.*
  :figwidth: 100%
  :width: 100%
  :alt: Propagation d'une onde Wi-Fi dans un appartement
  :align: center
  
  Propagation d'une onde Wi-Fi dans un appartement. Après avoir traversé 2 murs, l'onde Wi-Fi semble très amortie. Sous le résultat est affiché le plan de l'appartement et la position du routeur (petit disque à gauche)


Vous voulez tester ?
++++++++++++++++++++


- Téléchargez le bundle `Onelab <https://onelab.info>`_. Il contient `GMSH <https://gmsh.info>`_ et `GetDP <https://getdp.info>`_ (un solveur éléments finis) 
- Téléchargez `le code <https://github.com/Bertbk/wifi>`_, soit directement soit via `Git` :

  .. code-block:: bash

    git clone https://github.com/Bertbk/wifi.git wifi

- Dans le dossier et dans un terminal, lancer

  .. code-block:: bash

    gmsh wifi.pro

- Vous pouvez modifier un peu la géométrie et la fréquence de l'onde, mise à 1GHZ. Attention, cette simulation est très gourmande : testez d'aborg avec 1GHz avant de lancer la simulation pour 2.5GHz (au risque de faire crasher votre ordinateur) !