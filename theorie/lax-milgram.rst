
Théorème de Lax-Milgram
=======================

Énoncé
------

Nous pouvons maintenant énoncer le théorème de Lax-Milgram (**à connaître par cœur**).

.. proof:theorem:: de Lax-Milgram

  Soit :math:`V` un espace de Hilbert de produit scalaire :math:`\PS{\cdot}{\cdot}` et de norme :math:`\norm{\cdot}`, et soit la formulation faible suivante

  .. math:: 
    :label: eq-fvlax
    
    \left\{
      \begin{array}{l}
        \dsp \text{Trouver }u\in V \text{ tel que,}\\
        \forall v\in V,\quad a(u,v) = \ell(v).
      \end{array}
    \right.
 
  Sous réserve des quatre hypothèses suivantes :

  1. :math:`\ell` est une forme anti-linéaire continue sur :math:`V` :
  
    .. math::  \exists C>0 / \forall v \in V, \quad |\ell(v)| \leq C\norm{v}.

  2. :math:`a(\cdot,\cdot)` est une forme sesquilinéaire  sur :math:`V\times V`. 
  3. :math:`a(\cdot,\cdot)` est continue : 

    .. math::   \exists M>0 / \forall (u,v) \in V\times V, \quad \abs{a(u,v)} \leq M\norm{u}\norm{v}.

  4. :math:`a(\cdot,\cdot)` est coercive (ou elliptique) :

    .. math::  \exists \alpha > 0 / \forall u \in V, \quad a(u,u) \geq \alpha\norm{u}^2.

  Alors la formulation faible :eq:`eq-fvlax` admet une unique solution. De plus cette solution dépend continûment de la forme linéaire :math:`\ell` :

  .. math::  \norm{u} \leq \frac{M}{\alpha}C


.. proof:proof::
  
  Comme il est question de forme linéaire, nous allons utiliser le Théorème de représentation de Riesz. En effet, pour tout :math:`w` de :math:`V`, l'application :math:`v\to a(w,v)` est anti-linéaire et continue de :math:`V` dans :math:`\Rb`. Il existe donc un unique élément de :math:`V`, noté :math:`A(w)` (Théorème de Riesz), tel que
  
  .. math:: \forall v\in V, \quad a(w,v) = \PS{A(w)}{v}.

  Nous allons montrer que l'opérateur :math:`A\colon V\to V` est continue, inversible et d'inverse continu. L'opérateur :math:`A` est clairement linéaire. En prenant :math:`v=A(w)` et en utilisant la continuité de :math:`a(\cdot,\cdot)`, nous obtenons :

  .. math:: \|A(w)\|^2  = \PS{A(w)}{A(w)}= a(w,A(w)) \leq M\|w\|\|A(w)\|.

  Cette relation étant valable pour tout :math:`w`, elle signifie que :math:`A` est continue, puisque :

  .. math:: \forall w\in V, \qquad \|A(w)\| \leq M\|w\|.

  Appliquons de nouveau le Théorème de représentation de Riesz au membre de droite, puisque :math:`\ell` est une forme anti-linéaire continue:

  .. math:: \exists! f\in V\text{ tel que } \|f\| = \|\ell\|_{V'} \text{ et } \forall v\in V, \ell(v) = \PS{f}{v}.

  Comme :math:`A(u) = f` est équivalent à :math:`\forall v\in V, \PS{A(u)}{v} = \PS{f}{v}`, alors notre formulation faible :eq:`eq-fvlax` devient équivalent au problème linéaire:


  .. math:: 

    \left\{
      \begin{array}{l}
      \text{Trouver } u\in V \text{ tel que }\\
      A(u) = f.
      \end{array}
    \right.


  La question est : :math:`A` est-elle bijective ?   Utilisons la coercivité de l'application :math:`a(\cdot,\cdot)` :


  .. math:: \alpha\|w\|^2 \leq \Re\left(a(w,w)\right)  = \Re\left((A(w), w)\right)\leq \abs{((A(w), w)} \leq \|A(w)\|\|w\|,

  ce qui implique que

  .. math::   \alpha\|w\|\leq\|A(w)\|.
    :label: eq-demoLax

  Comme :math:`\alpha>0`, alors :math:`A` est injective. En dimension finie et comme :math:`A` est un endomorphisme, nous pourrions en déduire la surjectivité de :math:`A`. Mais nous sommes malheureusement en dimension infinie, nous devons donc montrer que :math:`\Image(A) = V`, pour cela nous montrons que :math:`\Image(A)` est fermé dans :math:`V` et que son orthogonal (dans :math:`V`) est réduit au singleton nul. Prenons une suite :math:`(A(w_n))_n` de :math:`\Image(A)` qui converge dans :math:`V`. Nous avons, pour tout :math:`n,p\in\Nb` et grâce à :eq:`eq-demoLax`,

  .. math::  \alpha\|w_n - w_p\|\leq\|A(w_n) - A(w_p)\|.

  Quand :math:`n` et :math:`p` tendent vers l'infini, alors :math:`\|w_n - w_p\| \to 0`. La suite :math:`(w_n)_n` est donc une suite de Cauchy dans :math:`V`, qui est complet (Hilbert), elle est donc convergente et converge vers un élément :math:`w` de :math:`V`. Par continuité de :math:`A`, la suite :math:`(A(w_n))_n` converge vers :math:`A(w)`, élément de :math:`\Image(A)`. Ce qui implique que :math:`\Image(A)` est fermé. Prenons maintenant :math:`v\in \Image(A)^{\perp}`, par la coercivité de :math:`a(\cdot,\cdot)`, nous avons

  .. math:: \alpha\abs{v}^2 \leq \abs{a(v,v)} \leq \abs{a(v,v)} = \abs{\PS{A(v)}{v}} = 0.

  Autrement dit, :math:`v=0` et donc :math:`\Image(A)^\perp = \{0\}` et nous avons

  .. math:: \Image(A) = \overline{\Image(A)} = \left(\Image(A)^{\perp}\right)^{\perp} = \{0\}^{\perp} = V.

  L'application :math:`A` est donc bijective. Son inverse :math:`A^{-1}` existe, et, avec :eq:`eq-demoLax`, nous obtenons sa continuité :

  .. math:: \forall w\in V, \qquad \norm{A^{-1}(w)}\leq \frac{1}{\alpha}\norm{w}.

  Ceci prouve que :math:`u` dépend continûment du membre de droite :math:`f` (qui dépend de :math:`\ell`). 


.. proof:remark::

  À quoi sert ce théorème ? Sous réserve de 4 hypothèses, nous aurons la garantie que la formulation faible obtenue précédemment admet une solution (ce qui est bien) et que cette solution est unique (encore mieux !). Il est donc d'une importance capitale.


Avant de pouvoir appliquer ce théorème proprement dit, nous devons connaître un peu mieux les espaces de Sobolev : Hilbert ? Norme ? Tant de questions.
