Quelques exemples d'EDP
=======================

Thermique
---------

Prenons un domaine borné et connexe :math:`\Omega`, par exemple le carré unité, qui représente un studio. En supposant le milieu homogène, la température :math:`T` au sein du studio vérifie *l'équation de Laplace*:

.. math:: (- \Delta T) = 0, \qquad \text{ dans }\Omega,

où l'opérateur :math:`\Delta := \sum_{i=1}^d\frac{\partial^2}{\partial x_i^2}` est le **Laplacien** ou **Opérateur de Laplace**.

Supposons maintenant que le studio comporte une source de chaleur, par exemple un radiateur. Nous le modélisons par une fonction :math:`q`, continue, valant :math:`0` partout sauf sur un petit domaine :math:`\Omega_R`. En notant la conductivité :math:`K`(=constante) du milieu alors :math:`T` vérifie **l'équation de Poisson** :

.. math:: (- \Delta T) = \frac{q}{K}, \qquad \text{ dans }\Omega.

Ce problème reste pour l'instant incomplet car il manque des conditions. Contrairement aux problèmes de Cauchy, il n'y a pas de condition initiale, car le régime est stationnaire, mais nous avons besoin de conditions sur le bord :math:`\partial\Omega` du domaine :math:`\Omega`. Nous parlons alors de *conditions aux limites* et par suite de *problème aux limites*. 

Ajoutons une fenêtre à notre studio portée à la douce température de :math:`T_0 = 10^\circ C` grâce à l'automne frisquet. Le reste des murs est supposé parfaitement isolants, autrement dit le flux à travers les parois est nul. Le flux d'une quantité sur une interface étant donné par

.. math:: \text{flux }:= \nabla T \cdot \mathbf{n} = \partial_\mathbf{n} T,

où :math:`\mathbf{n}` est le vecteur unitaire normale sortant au domaine.  Le bord de notre appartement, noté :math:`\Gamma :=\partial\Omega`, est alors divisé en deux parties :

- :math:`\Gamma_D` : la fenêtre sur laquelle la température est imposée : **condition de Dirichlet**.
- :math:`\Gamma_N` : les murs supposés isolants sur lesquels le flux est imposé : **condition de Neumann**.

Notre problème s'écrit alors :

.. math:: \left\{
  \begin{array}{ r c l l}
    - \Delta T &= &\displaystyle\frac{q}{K}, & \text{ dans }\Omega,\\
    T  &=  &T_0, & \text{ sur } \Gamma_D,\\
  \partial_\mathbf{n} T  &= & 0, & \text{ sur } \Gamma_N.
  \end{array}
  \right.

Nous verrons dans ce cours que ce problème admet une solution (ouf) et qui est, de plus, unique (re-ouf). Résoudre le problème analytiquement (*i.e.* "à la main") peut s'avérérer délicat, notamment si la géométrie est complexe : c'est ici que la simulation numérique rentre en jeu et notamment les éléments finis. 



Diffusion d'une onde Wifi dans un appartement (Projet 2017-2018)
----------------------------------------------------------------

Cet exemple est tiré du :ref:`projet proposé en 2017 - 2018 <projet-wifi>`.

Modèle 
++++++

La définition `Wikipédia <https://fr.wikipedia.org/wiki/Onde>`_ d'une onde est la suivante :

  Une onde est la propagation d'une perturbation produisant sur son passage une variation réversible des propriétés physiques locales du milieu. Elle se déplace avec une vitesse déterminée qui dépend des caractéristiques du milieu de propagation. Une onde transporte de l'énergie sans transporter de matière.

Mathématiquement, une onde :math:`\mathscr{E}(\xx,t)` dépend du temps :math:`t` et de l'espace :math:`\xx`, et vérifie l'équation des ondes :

.. math:: \Delta \mathscr{E}(\xx,t) = \frac{1}{c^2}\frac{\partial^2 \mathscr{E}}{\partial t^2}(\xx,t),

où :math:`c` est la célérité de l'onde dans le milieu (qui peut dépendre de la position :math:`\xx` !). Par exemple, dans le cas d'une onde électromagnétique et dans le vide, :math:`c` est la célérité de la lumière, soit :math:`299792458\mathrm{m.s}^{-1}`. La quantité :math:`\xx` est un vecteur de dimension :math:`d=2` ou :math:`d=3` selon le problème considéré : dans notre cas :math:`d=2`. 

Lors d'une excitation périodique, c'est-à-dire lorsque la pulsation :math:`\omega` (en :math:`\mathrm{rad.s}^{-1}`) de l'onde est fixée, l'onde s'écrit alors :math:`\mathscr{E}(\xx,t) = \Re\left(u(\xx)e^{-\imath \omega t}\right)` où :math:`\imath=\sqrt{-1}` et :math:`E` est une onde *spatiale* satisfaisant l'équation de Helmholtz :

.. math:: \Delta E + \frac{\omega^2}{c^2}E = f.

Cette équation s'obtient en remplaçant :math:`\mathscr{E}(\xx,t)` par :math:`E(\xx)e^{-\imath \omega t}` dans l'équation des ondes. Nous notons en général :math:`k = \frac{\omega}{c}` (en :math:`\mathrm{rad.m}^{-1}`) le nombre d'onde et :math:`\lambda = \frac{2\pi}{k}` (en :math:`\mathrm{m}`) la longueur d'onde, autrement dit, la distance entre deux amplitudes, de sorte que l'équation de Helmholtz s'écrit

.. math:: \Delta E + k^2E = f.

La source :math:`f` est ici spatiale, dans le cas d'une source ponctuelle de centre :math:`\mathbf{s}` la source est alors un Dirac:

.. math:: \Delta E + k^2E = -\delta_{\mathbf{s}}.

Les ondes Wi-Fi  qui suivent la `norme IEEE 802.11g <https://fr.wikipedia.org/wiki/IEEE_802.11>`_ sont émises à une fréquence variant de 2.4GHz à 2.5GHz. 
L'appartement tout entier dans lequel est situé notre routeur est noté :math:`\Omega`. Les murs sont supposés être du même matériau : du placo-plâtre. Le domaine :math:`\Omega = \Omega_a\cup\Omega_{\text{mur}}` est décomposé en deux domaines, :math:`\Omega_a` pour l'air et :math:`\Omega_{\text{mur}}` pour les murs.

Une modélisation possible de ce problème est le système d'équations suivant :

En supposant que l'air a les mêmes propriétés électromagnétiques que le vide

.. math:: \left\{
  \begin{array}{r c l l}
    \Delta E(\xx) + k^2n(\xx)^2E(\xx)  &= & -\delta_{\text{routeur}}(\xx) & \text{ dans } \Omega,\\
    \dn E(\xx) - \imath k n(\xx) E(\xx) & = & 0 & \text{ sur }\partial\Omega,
  \end{array}
  \right.

où nous avons :

- :math:`\delta_{\text{routeur}}` : position du routeur. Nous l'avons placé dans le salon.
- :math:`n` : *fonction de contraste* qui prend en compte les caractéristiques électromagnétiques du mur et de l'air :

.. math:: n(\xx) =
  \left\{
    \begin{array}{l l l}
      1 & \text{ si } \xx\in\Omega_a & (\textit{i.e. } \xx \text{ est dans l'air}),\\
      2.4 & \text{ si } \xx\in\Omega_{\text{mur}} & (\textit{i.e. } \xx \text{ est dans le mur}).
    \end{array}
  \right.

  Notez que ces valeurs sont des valeurs physiques et ne sont pas une lubie mathématique.

- La dernière équation, :math:`\dn E - \imath k n E = 0` est une **condition de Fourier-Robin** (ou *de Fourier* ou *de Robin* ou même *d'impédance*). Elle a pour but *d'absorber* (avec un succès mitigé) les ondes sortantes, mimant un mur "transparent" (sans réflexion d'ondes). 

Résolution numérique
++++++++++++++++++++

La résolution d'un tel problème dans un appartement deux pièces avec cuisine séparée (grand luxe Parisien) avec la méthode des éléments finis donne alors ce résultat :

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

Objectifs du cours
------------------

Vous serez capable de résoudre ce genre de problème (et bien d'autres) et, ainsi, d'épater votre famille lors de ces interminables dîners.