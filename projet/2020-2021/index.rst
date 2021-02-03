
2020-2021
=========

Problème
--------

Soit le domaine suivant modélisant un appartement :

.. figure:: /img/projet/2020-2021-flat.*
  :figwidth: 100%
  :width: 75%
  :alt: Appartement
  :align: center

  Domaine :math:`\Omega` et ses bords : un petit appartement tout mignon

Les murs sont supposés parfaitement isolant (nous pouvons toujours rêver !) , ce qui explique la condition de Neumann homogène que nous imposons. Nous remarquons que le bord de :math:`\Omega` est séparé en plusieurs parties : les radiateurs (:math:`\Gamma_{\text{Rad}}`), les fenêtres (:math:`\Gamma_{\text{Fen}}`) et les murs (:math:`\Gamma_{\text{Mur}}`). Nous cherchons à calculer la température :math:`u` dans la pièce, qui vérifie le système suivant

.. math::
  :label: eq-projet20202021

  \left\{
  \begin{array}{r c l l}
    -\Delta u & = & 0 & (\Omega) \\
    u & = & T_c & (\Gamma_{\text{Rad}})\\
    u & = & T_f & (\Gamma_{\text{Fen}})\\
    \dn u & = & 0 & (\Gamma_{\text{Mur}})
  \end{array}
  \right.

Les paramètres sont les suivants :

- La longueur :math:`L \simeq 10`
- la largeur :math:`\ell \simeq 10`
- l'épaisseur des murs :math:`d \simeq 0.5`
- la longueur d'une fenêtre est d'environ 1
- la longueur d'un radiateur est d'environ 1
- Les températures :math:`T_c = 25` et :math:`T_f = -10` sont les températures respectivement des radiateurs (ça chauffe) et de dehors (ça caille)

Tous ces paramètres peuvent être librement modifiés par vous même et les paramètres de la géométrie doivent même être choisis par vous ! 


Travail demandé
---------------
Nous souhaitons résoudre ce problème à l'aide de la méthode des éléments finis :math:`\Pb^1-` Lagrange.


1. **Construisez** la géométrie. Il ne s'agit pas de reproduire exactement l'appartement décrit plus haut mais de construire un appartement : libre à vous d'ajouter des pièces, fenêtres, des radiateurs ou un poster de Justin Bieber. 
2. **Programmez** un code éléments finis P1 qui résolve le problème :eq:`eq-projet20202021`

Consignes
---------

1. Vous **pouvez** réaliser ce **projet en binôme**
2. Vous **devez** rendre ce projet sous la forme d'un dépôt :code:`git` : envoyez moi **l'URL du dépôt uniquement**, **pas de fichier zip** !
3. Date limite de rendu : **28 février à 23h59**. Pas de blague, **tout projet rendu après le 28 février ne sera pas noté**.

En outre, **votre dépôt doit contenir** :

1. Un **script** qui résout le problème :eq:`eq-projet20202021` et **affiche** la solution.
2. Un court fichier **README.md** facilitant sa compréhension, répondant notamment aux questions : "comment lance-t-on vos programmes ?" et "que doit-on obtenir ?" (exemple : "*Exécutez 'main.py' et vous devez obtenir la même image que 'solution.png' qui résout le problème méga compliqué*")
3. Ajoutez à votre dépôt une **image** de la solution que vous avez obtenue (en PNG (pas très grosse svp !) et surtout pas en JPG). Vous pouvez même afficher l'image dans le fichier :code:`README.md`.

.. proof:remark::

  Pour faire simple, je dois pouvoir télécharger votre dépôt, lancer un fichier, et voir la solution, le tout sans avoir à réfléchir de mon côté :-)