
Calcul des Matrices Élémentaires
================================

Matrices de Masse et de Rigidité
---------------------------------

La matrice :math:`\Ahh` peut être décomposée en deux matrices : la masse et la rigidité :

.. math:: \Ahh = D + c M,

- :math:`M` : la matrice de masse (ou de volume), de coefficient

  .. math:: M_{I,J} = \int_{\Omega} \mphi_J\mphi_I.

- :math:`D` : la matrice de rigidité, de coefficient

  .. math:: D(I,J)=  \int_{\omega}\nabla\mphi_J\nabla\mphi_I.

  Dans la littérature, cette matrice est souvent notée :math:`K`, mais nous l'appelons :math:`D` pour éviter toute confusion avec les triangles, nommés :math:`K` également.

.. proof:remark::

  La matrice de masse :math:`M` représente l'opérateur Identité dans la base des fonctions de forme (qui n'est pas orthogonale ni normée !). Pour s'en convaincre, il faut regarder "l'équation" :math:`u=f` (ou :math:`Id. u = f`) et appliquer la méthode des éléments finis pour obenir la "formulation faible"

  .. math::  \forall \vh, \quad \int_{\Omega} \uh\vh = \int_{\Omega}f\vh,

  qui aboutit au système linéaire suivant : :math:`M\Uh = \Bh`. L'opérateur Identité, appliqué à :math:`u`, est bien discrétisé en :math:`M`.

Les **contributions élémentaires**, c'est à dire les quantités :math:`a_p(\mphi_j^p,\mphi_i^p)` et :math:`\ell_{p}(\mphi_i^p)` peuvent elles aussi être décomposées en deux parties. Pour rappel, les sommets d'un triangle :math:`\tri_p` seront notés :math:`[\vertice_{0}^{p}, \vertice_{1}^{p},\vertice_{2}^{p}]` et ordonnés dans le sens trigonométrique. Nous noterons :math:`\vertice_i^p=(x_i^p, y_i^p)` et :math:`\mphi_j^p` une fonction de forme du triangle :math:`\tri_p` sans la supposer linéaire. Nous notons :math:`\Me{p}` et :math:`\De{p}` les matrices de masse et de rigidité élémentaire du triangle :math:`\tri_p`, de coefficient respectif :math:`\Me{p}(i,j)` et :math:`\De{p}(i,j)` donné par

.. math:: 

  \begin{aligned}
    \Me{p}(i,j) &= \int_{\tri_p}\mphi_j^p\mphi_i^p\\
    \De{p}(i,j) &=\int_{\tri_p}\nabla\mphi_j^p\nabla\mphi_i^p.
  \end{aligned}

Matrice de masse élémentaire
----------------------------

Nous nous focalisons sur la matrice de masse, le principe est similaire pour la matrice :math:`K` et est détaillé juste après.

Pour construire la matrice :math:`M`, nous avons vu qu'il était préférable de parcourir les triangles plutôt que les sommets, autrement dit, plutôt que de calculer :math:`M_{I,J}` directement, mieux vaut calculer, pour tout triangle :math:`p`, la **contribution élémentaire** :math:`\Me{p}(i,j)` pour :math:`i,j = 1,2,3`, définie par :

.. math:: \Me{p}(i,j)= \int_{\tri_p} \mphi_j^p(\xx)\ \mphi_i^p(\xx)\diff\xx.
  :label:eq-matelem

Chaque contribution élémentaire :math:`\Me{p}(i,j)` est ensuite ajoutée à :math:`M_{I,J}`, avec :math:`I=\locToGlob(p,i)` et :math:`J=\locToGlob[p][j]`. 
  
.. proof:remark::

  Les coefficients :math:`\Me{p}(i,j)`, pour :math:`i,j=1,2,3` peuvent être regroupés pour former la **matrice de masse élémentaire** :math:`\Me{p}` de taille :math:`3\times 3` et du triangle :math:`\tri_p`.
  

Triangle de référence
+++++++++++++++++++++

  
Pour calculer la quantité élémentaire :eq:`eq:matelem`, plaçons nous tout d'abord dans un triangle "simple" :math:`\trih`, appelé **triangle de référence**. Celui-ci est souvent choisi comme étant le triangle rectangle de sommets :math:`\verticeh_{0}=(0,0)`, :math:`\verticeh_{1}=(1,0)` et :math:`\verticeh_{2}=(0,1)`, ordonnés dans le sens trigonométrique. Pour différencier ce triangle d'un triangle du maillage, nous lui adjoignons un repère :math:`(\xi,\eta)`   dit **repère paramétrique**.
  
.. 
  %TODO:  {{< figure src="../triangle_ref.svg" title="Triangle de référence :math:`\trih` et son repère paramétrique :math:`(\xi,\eta)`." numbered="true" >}}
  
Plutôt que d'indicer par :math:`p`, nous notons :math:`\mphih_i \in \Pb^1(\trih)` les trois fonctions de forme associées aux sommets :math:`\verticeh_i`, pour :math:`i=0,1,2`, définies par :math:`\mphih_i(\verticeh_j) = \delta_{ij}`. Ces fonctions :math:`\mphih_i` étant des polynômes de degré un, nous pouvons même les calculer analytiquement :

.. math:: 

  \left\{
    \begin{array}{l}
      \mphih[0](\xi,\eta) = 1-\xi-\eta\\
      \mphih[1](\xi,\eta) = \xi\\
      \mphih[2](\xi,\eta) = \eta\\
    \end{array}
  \right.

.. proof:lemma::

  Dans le triangle :math:`\trih`, la matrice de masse élémentaire :math:`\Meh = (\Meh_{i,j})_{0\leq i,j\leq 2}` de coefficient 

  .. math:: 
  
    \Meh_{i,j} = \int_{\trih} \mphih_j(\xi)\overline{\mphih_j(\eta)} \diff(\xi,\eta),

  est donnée par

  .. math::  \Meh = \frac{1}{24}\left(
      \begin{array}{c c c}
        2 & 1 & 1\\
        1 & 2 & 1\\
        1 & 1 & 2
      \end{array}
    \right).
  
.. proof:proof::

  Prenons tout d'abord le cas :math:`i=j=1`, soit :math:`\mphih_i = \mphih_j = \mphih[2](\xi,\eta) = \xi`. Dans ce cas :

  .. math:: 
  
    \int_{\trih} \xi^2 \diff (\xi,\eta) = \int_0^1\int_0^{1-\xi} \xi^2 \diff\eta\diff\xi = \int_0^1(1-\xi)\xi^2\diff\xi =
    \left[\frac{\xi^3}{3} - \frac{\xi^4}{4}\right]_0^1=\frac{1}{3}-\frac{1}{4} = \frac{1}{12}.
  
  Les calculs sont similaires pour :math:`i=0` et :math:`i=2`. Prenons maintenant :math:`i\neq j`, par exemple :math:`i=2` et :math:`j=1` :

  .. math::
  
    \int_{\trih} \xi\eta \diff (\xi,\eta) = \int_0^1\left(\int_0^{1-\xi} \eta \diff\eta\right)\xi\diff\xi
    =  \frac{1}{2}\int_0^1(1-\xi)^2\xi\diff\xi  
    =  \frac{1}{2}\left[ \frac{1}{2} - \frac{2}{3} +\frac{1}{4}\right] =\frac{1}{24}.
  Les calculs sont similaires pour les autres combinaisons.


Triangle quelconque
+++++++++++++++++++

**Changement de coordonnées.** Soit un triangle :math:`\tri_p` du maillage et supposons que nous disposions d'une transformation bijective et linéaire :math:`\trihToTri{p}` permetteant de transformer le triangle de référence :math:`\trih` en :math:`\tri_p` avec en plus :math:`\trihToTri{p}(\verticeh_i) = \vertice_i^p`. Cette fonction :math:`\trihToTri{p}` transforme les  **coordonnées paramétriques** :math:`(\xi,\eta)` en **coordonnées physiques** :math:`(x,y)` avec :math:`(x,y)=\trihToTri{p}(\xi,\eta)\in\tri_p`, et conserve "l'ordre des sommets".

.. 
  % TODO: {{< figure src="../ref.svg" title="Passage du triangle de référence :math:`\trih` vers un triangle :math:`\tri_p` par la transformation :math:`\trihToTri{p}`." numbered="true" >}}

Nous avons :math:`\mphi_j^p(x,y) = \mphi_j^p(\trihToTri{p}(\xi,\eta))` avec :math:`\mphi_j^p\circ\trihToTri{p}\in\Pb^1(\trih)` et :math:`\mphi_j^p\circ\trihToTri{p}(\verticeh_i) = \delta_{ij}`. Par unicité, nous avons :math:`\mphi_j^p\circ\trihToTri{p} = \mphih_j`.

En notant :math:`\JK{p}` la matrice Jacobienne de :math:`\trihToTri{p}`, alors la quantité :math:`\Me{p}(i,j)` peut alors s'écrire, par changement de variables :

.. math::  \Me{p}(i,j) = \displaystyle\int_{\tri_p}\mphi_j^p(x,y)\overline{\mphi_i^p(x,y)} \diff(x,y)
      =\displaystyle \abs{\det(\JK{p})}\underbrace{\int_{\trih}\mphih_j(\xi,\eta)\mphih_i(\xi,\eta)\diff(\xi,\eta)}_{\text{Déjà calculé !}}

Ainsi, pour calculer la matrice élémentaire d'un triangle :math:`\tri_p` quelconque, nous n'avons besoin que du déterminant de la Jacobienne : :math:`\det(\JK{p})`.

**Expression et Jacobienne de la transformation.** La transformation que nous cherchons, :math:`\trihToTri{p}`, est linéaire et "conserve" les sommets et leur ordre. Pour obtenir son expression, nous construisons des fonctions **d'interpolation géométrique**, :math:`(\psih_i)_{0\leq i \leq 2}`, linéaires sur :math:`\trih` et telles que :

.. math:: \forall i,j=0,1,2, \quad \psih_i(\verticeh_j) = \deltaij.

La transformation aura alors pour expression :

.. math:: 
  \begin{array}{r c c l}
      \trihToTri{p}\colon & \trih & \to & \tri_p\\
    & (\xi,\eta) & \mapsto & \trihToTri{p}(\xi,\eta) = (x,y) = \psih_{0}(\xi,\eta) \vertice_{0}^{p} + \psih_{1}(\xi,\eta) \vertice_{1}^{p} + \psih_{2}(\xi,\eta) \vertice_{2}^{p}.
  \end{array}

En d'autres termes, les fonctions d'interpolation géométrique :math:`\psih_i` sont ici identiques aux fonctions de forme :math:`\mphih_i` :

.. math:: 
  \left\{
    \begin{array}{l}
    \psih_{0}(\xi,\eta) = 1 - \xi - \eta\\
    \psih_{1}(\xi,\eta) = \xi\\
    \psih_{2}(\xi,\eta) = \eta\\
    \end{array}
  \right.


La matrice Jacobienne de la transformation est alors donnée par

.. math:: 

  \JK{p} = 
  \left(
    \begin{array}{c c}
      \displaystyle\frac{\partial x}{\partial \xi} &\displaystyle \frac{\partial x}{\partial \eta} \\
      \displaystyle\frac{\partial y}{\partial \xi} &\displaystyle \frac{\partial y}{\partial \eta}
    \end{array}
  \right) =
  \left(
    \begin{array}{c c}
      x_{1}^{p} - x_{0}^{p} & x_{2}^{p} - x_{0}^{p}\\
      y_{1}^{p} - y_{0}^{p} & y_{2}^{p} - y_{0}^{p}
    \end{array}
  \right),

et son déterminant vaut

.. math:: 

  \begin{aligned}
  \abs{\det(\JK{p})} &= \abs{(x_{1}^{p}-x_{0}^{p})(y_{2}^{p}-y_{0}^{p}) - (x_{2}^{p}-x_{0}^{p})(y_{1}^{p}-y_{0}^{p})}\\
  &= 2|\tri_p| \neq 0,
  \end{aligned}

ce qui implique que le déterminant est non nul puisque le triangle n'est pas dégénéré : la transformation :math:`\trihToTri{p}` est bien inversible.

.. proof:remark::

  Quand :math:`\psih_i = \mphih_i`, nous parlons d'éléments finis **isoparamétriques**. Il convient de retenir que ce choix n'est pas obligatoire et les fonctions :math:`\psih_i` et :math:`\mphih_i` sont **indépendantes**. En particulier, pour obtenir des éléments courbes, les fonctions :math:`\psih_i` pourraient être quadratiques par exemple.

.. 
  %TODO: {{< figure class="app-jacobi" title="<i class='fas fa-play-circle'></i> \alert{Time To Play!}<br>**Déplacez les sommets du triangle** pour modifier la valeur du **Jacobien**. Quand il est négatif cela signifie que le triangle est **\"retourné\"** par rapport au triangle de référence." numbered="true" >}}

**Expression finale de la matrice élémentaire.**

.. proof:lemma::

  La matrice de masse élémentaire :math:`\Me{p} = (\Me{p}(i,j))_{0\leq i,j\leq 2}` du triangle :math:`\tri_p` a pour expression

  .. math:: \Me{p} =   \frac{\abs{\tri_p}}{12}
    \left(
      \begin{array}{c c c}
        2 & 1 & 1\\
        1 & 2 & 1 \\
        1 & 1 & 2
      \end{array}
      \right).
    

Matrice de rigidité élémentaire
-------------------------------

Nous appliquons la même procédure pour la matrice de rigidité :math:`D`, autrement dit, nous calculons les matrices de rigidité élémentaire :math:`\De{p}` définies par

.. math:: \De{p}(i,j) = \int_{\tri_p}\nabla \mphi_j^p(x,y)\cdot \overline{\nabla\mphi_i^p(x,y)}\diff(x,y).


Triangle de référence
+++++++++++++++++++++

.. proof:lemma::

  Dans le triangle de référence :math:`\trih`, la matrice de rigidité élémentaire :math:`\hat{K}= (\hat{D}_{i,j})_{0\leq i,j\leq 2}` de coefficient

  .. math:: \hat{D}_{i,j} = \int_{\trih}\nabla \mphih_j(\xi,\eta)\cdot \nabla\mphih_i(\xi,\eta)\diff(\xi,\eta),

  a pour expression

  .. math::   \hat{D} =  \frac{1}{2}
    \left(
      \begin{array}{l l c}
        2 & -1 & -1 \\
        -1 & 1 & 0 \\
        -1 & 0 & 1
      \end{array}
    \right)

.. proof:proof::

  Les gradients des fonctions de forme :math:`\mphih_j` sont donnés par :

  .. math:: 

    \nabla_{\xi,\eta}\mphih[0] =
    \begin{pmatrix}
        -1\\
        -1
      \end{pmatrix}
    ,
    \quad
    \nabla_{\xi,\eta}\mphih[1] =
      \begin{pmatrix}
        1\\
        0
      \end{pmatrix},
    \quad
    \nabla_{\xi,\eta}\mphih[2] =
      \begin{pmatrix}
        0\\
        1
    \end{pmatrix}.

  La matrice étant symétrique, nous pouvons limiter les calculs à la partie triangulaire supérieure :

  .. math:: 

    \begin{aligned}
    \hat{D}_{1,1} &=
      \int_{\trih}\nabla\mphih_1\cdot\nabla\mphih_1 \diff (\xi,\eta) =
      \int_{\trih} (-1,-1)\begin{pmatrix}-1\\ -1\end{pmatrix}\diff (\xi,\eta) =
      2 \int_{\trih} \diff(\xi,\eta) &&= 1\\
    \hat{D}_{2,2} &=
      \int_{\trih}\nabla\mphih_2\cdot\nabla\mphih_2 \diff (\xi,\eta) =
      \int_{\trih} (1,0)\begin{pmatrix}1\\ 0\end{pmatrix} \diff (\xi,\eta) =
        \int_{\trih} \diff(\xi,\eta) &&= \frac{1}{2} =\hat{D}_{3,3}\\
    \hat{D}_{1,2} &=
      \int_{\trih}\nabla\mphih_1\cdot\nabla\mphih_2 \diff (\xi,\eta) =
      \int_{\trih} (-1,-1)\begin{pmatrix}1\\ 0\end{pmatrix} \diff (\xi,\eta) =
        -\int_{\trih} \diff(\xi,\eta) &&= -\frac{1}{2}\\
    \hat{D}_{1,3} &=
      \int_{\trih}\nabla\mphih_1\cdot\nabla\mphih_3 \diff (\xi,\eta) =
      \int_{\trih} (-1,-1)\begin{pmatrix}0\\ 1\end{pmatrix} \diff (\xi,\eta) =
        -\int_{\trih} \diff(\xi,\eta)&& = -\frac{1}{2}\\
    \hat{D}_{2,3} &=
      \int_{\trih}\nabla\mphih_2\cdot\nabla\mphih_3 \diff (\xi,\eta) =
      \int_{\trih} (1,0)\begin{pmatrix}0\\ 1\end{pmatrix} \diff (\xi,\eta) &&=
      0.
    \end{aligned}


Triangle quelconque
+++++++++++++++++++

Pour calculer les dérivées partielles selon :math:`x` et :math:`y` de :math:`\mphih_j`, nous utilisons la dérivée de fonction composée :

.. math:: 

  \begin{pmatrix}
      \displaystyle \frac{\partial \mphi_j^p}{\partial x}\\[0.2cm]
      \displaystyle \frac{\partial \mphi_j^p}{\partial y}
    \end{pmatrix} = 
  \begin{pmatrix}
      \displaystyle \frac{\partial \xi}{\partial x} & \displaystyle \frac{\partial \eta}{\partial x}\\[0.2cm]
      \displaystyle \frac{\partial \xi}{\partial y} & \displaystyle \frac{\partial \eta}{\partial y}
  \end{pmatrix}
  \begin{pmatrix}
      \displaystyle \frac{\partial \mphih_j}{\partial \xi}\\[0.2cm]
      \displaystyle \frac{\partial \mphih_j}{\partial \eta}
  \end{pmatrix}

En notant :math:`\BK{p}` la matrice de passage, nous avons

.. math:: \nabla_{x,y}\mphi_j^p(x,y) = \BK{p}\nabla_{\xi,\eta}\mphih_j(\xi,\eta).

L'opération "inverse" nous donne :

.. math:: 
  \begin{pmatrix}
      \displaystyle \frac{\partial \mphih_j}{\partial \xi}\\[0.2cm]
      \displaystyle \frac{\partial \mphih_j}{\partial \eta}
    \end{pmatrix}
    =
  \begin{pmatrix}
    \displaystyle \frac{\partial x}{\partial \xi} & \displaystyle \frac{\partial y}{\partial \xi}\\[0.2cm]
    \displaystyle \frac{\partial y}{\partial \eta} & \displaystyle \frac{\partial y}{\partial \eta}
  \end{pmatrix}
  \begin{pmatrix}
    \displaystyle \frac{\partial \mphi_j^p}{\partial x}\\[0.2cm]
    \displaystyle \frac{\partial \mphi_j^p}{\partial y}
  \end{pmatrix}
  \iff
  \nabla_{\xi,\eta}\mphih_j(\xi,\eta) = (\JK{p})^T\nabla_{x,y}\mphi_j^p(x,y).

Nous en déduisons que :math:`\BK{p} = (\JK{p}^T)^{-1}`, en particulier, dans le cas d'une transformation linéaire de triangle, nous obtenons :

.. math:: 
  \BK{p} =
  \frac{1}{\det(\JK{p})}
    \left(
    \begin{array}{c c}
      y_{3}^{p}-y_{1}^{p} & y_{1}^{p}-y_{2}^{p}\\
      x_{1}^{p}-x_{3}^{p} & x_{2}^{p}-x_{1}^{p}
    \end{array}
  \right).

Au final, comme :math:`X\cdot Y = X^TY`, nous obtenons

.. math:: \int_{\tri_p} (\nabla\mphi_j^p)^T\nabla\mphi_i^p \diff(x,y)
    = \abs{\det(\JK{p})}\int_{\trih} (\nabla\mphih_j)^T  (\BK{p}^T \overline{\BK{p}})\overline{\nabla\mphih_i} \diff (\xi,\eta).
  :label: eq-intRigidite


La matrice :math:`\BK{p}` étant réelle, nous pouvons supprimer la conjugaison portant sur :math:`\BK{p}`.

.. proof:lemma::

  Les coefficients a matrice de rigidité élémentaire :math:`\De{p} = (\De{p}(i,j))_{0\leq i,j\leq 2}` sont obtenus pas la relation suivante

  .. math:: 

    \begin{aligned}
    \De{p}(i,j) &= \int_{\tri_p}\nabla \mphi_j^p(x, y)\cdot \overline{\nabla\mphi_i^p(x,y)}\diff(x,y),\\
      &= \abs{\tri_p}(\nabla\mphih_j)^T  (\BK{p}^T \overline{\BK{p}})\overline{\nabla\mphih_i}.
    \end{aligned}

.. proof:proof::

  Pour les éléments finis :math:`\Pb^1`, les gradients :math:`\nabla\mphih_j` sont constants et peuvent être sortis de l'intégrale. De plus, comme :math:`\abs{\det(\JK{p})} = 2\abs{\tri_p}` et :math:`\abs{\trih}= \frac{1}{2}`, nous avons

  .. math::  \int_{\tri_p} \nabla\mphi_j^p\cdot\nabla\mphi_i^p \diff(x,y) =\abs{\tri_p}(\nabla\mphih_j)^T  (\BK{p}^T \overline{\BK{p}})\overline{\nabla\mphih_i}.

Second membre (ou RHS ou Membre de droite)
------------------------------------------

Étudions maintenant les termes du membre de droite comme

.. math:: \int_{\tri_p}f(\xx)\mphi_i^p(\xx)\diff \xx.

Sauf pour certaines fonctions :math:`f` particulières, nous ne pourrons certainement pas calculer explicitement ce terme, nous devons approcher cette intégrale à l'aide d'une formule de quadrature en passant à l'éléments de référence :

.. math:: \begin{aligned}
  \displaystyle \int_{\tri_p}f(\xx)\mphi_i^p(\xx)\diff \xx &=
  \displaystyle \abs{\det(\JK{p})}\int_{\trih}f(\xx(\xi,\eta))\overline{\mphih_i(\xi,\eta)}\diff (\xi,\eta) \\
  & \displaystyle \simeq \abs{\det(\JK{p})}\sum_{m=0}^{M-1}\omega_m f(\xx(\xi_m,\eta_m))\overline{\mphih(\xi_m,\eta_m)}.
  \end{aligned}

Les points :math:`(\xi_m,\eta_m)` sont appelés **points de quadrature** (parfois **points de Gauss**, même si la règle de quadrature utilisée n'est pas de Gauss) et les quantités :math:`\omega_m\in\Rb` les **poids** associés. Notons que le point :math:`\xx_m = \xx(\xi_m,\eta_m)` s'obtient par l'expression vue précédemment :

.. math:: \xx_m = \sum_{i=0}^2\vertice_i^p\psih_i(\xi_m,\eta_m).

Nous présentons ici deux règles de quadrature pour l'intégrale :math:`\int_{\trih}\gh(\xx)\diff\xx` sur :math:`\trih` d'une fonction :math:`g` quelconque. La première règle est exacte pour des polynômes de degré 1, la deuxième pour des polynômes de degré 2 (règles de Hammer) :


+-----------------+------------------+------------------+--------------------+
| :math:`\xi_m`   | :math:`\eta_m`   | :math:`\omega_m` | Degré de précision |
+=================+==================+==================+====================+
| 1/3             | 1/3              | 1/6              | 1                  |
+-----------------+------------------+------------------+--------------------+
| 1/6             | 1/6              | 1/6              | 2                  |
+-----------------+------------------+------------------+--------------------+
| 4/6             | 1/6              | 1/6              |                    |
+-----------------+------------------+------------------+--------------------+
| 1/6             | 4/6              | 1/6              |                    |
+-----------------+------------------+------------------+--------------------+


.. proof:remark::

  Les formules de quadrature ont évidemment un impact sur la qualité de l'approximation, toutefois, elles jouent un rôle relativement mineur par rapport aux autres approximations (et l'on peut choisir plus de points d'intégration !).
