# Regex finder

## inline math to sphinx

\$([a-zA-Z0-9 \\\^_\[\]\(\)\{\} +=\*%\-,]+)\$
:math:`$1`

## Math env (no label)

\[blibli\]

.. math::

  blibli

\begin{equation}
\label{blabla}
blibli
\end{equation}

.. math::
  :label: blabla

  blibli

## cross ref

\eqref{blibli}
:eq:`blibli`

## Section

#######
\part{}
#######

**********
\chapter{}
**********

\section{}
----------

\subsection{}
+++++++++++++

\subsubsection{}
^^^^^^^^^^^^^^^^

