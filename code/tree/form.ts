import type { Leaf } from '../leaf/form.js'
import haveHalt from '@termsurf/have/make/halt.js'

export enum TreeHint {
  // Mark = 'mark',
  // bind == interpolated == dynamic
  BindKnit = 'bind-knit',
  BindText = 'bind-text',
  Void = 'void',
  // Size = 'size',
  Knit = 'knit',
  Text = 'text',
}

export enum TreeForm {
  Tree = 'tree',
  Link = 'link',
  Term = 'term',
  Mark = 'mark',
  Cord = 'cord',
  Bind = 'bind',
  Text = 'text',
}

export type TreeHash = {
  tree: Tree
  link: TreeLink
  term: TreeTerm
  mark: TreeMark
  cord: TreeCord
  bind: TreeBind
  text: TreeText
}

export const TREE_FORM = [
  TreeForm.Tree,
  TreeForm.Link,
  TreeForm.Term,
  TreeForm.Mark,
  TreeForm.Cord,
  TreeForm.Bind,
  TreeForm.Text,
]

export type Tree = {
  form: TreeForm.Tree
  list: Array<TreeLink>
}

export type TreeLink = {
  form: TreeForm.Link
  text: string
  list: Array<TreeTerm | TreeLink | TreeCord | TreeMark>
  base?: TreeTerm | TreeBind
  code?: TreeCode
}

export type TreeTerm = {
  form: TreeForm.Term
  list: Array<TreeCord | TreeBind>
  base?: TreeTerm | TreeBind
  code?: TreeCode
}

export type TreeBind = {
  form: TreeForm.Bind
  size: number
  link: TreeLink
  base?: TreeSite
  code?: TreeCode
}

export type TreeMark = {
  form: TreeForm.Mark
  text: string
  base?: TreeSite
  code?: TreeCode
}

export type TreeCord = {
  form: TreeForm.Cord
  text: string
  base?: TreeText | TreeBind
  code?: TreeCode
}

export type TreeText = {
  form: TreeForm.Text
  list: Array<TreeCord | TreeBind>
  base?: TreeSite
  code?: TreeCode
}

/**
 * This gets a base and head leaf,
 * so we know where it starts and ends easily.
 */

export type TreeCode = {
  base?: Leaf
  head?: Leaf
}

export type TreeSite =
  | TreeMark
  | TreeLink
  | TreeTerm
  | TreeBind
  | TreeCord
  | TreeText
  | Tree

export function testTreeForm<N extends TreeForm>(
  lead: unknown,
  name: N,
): lead is TreeHash[N] {
  return (lead as TreeSite).form === name
}

export function haveTreeForm<N extends TreeForm>(
  lead: unknown,
  name: N,
): asserts lead is TreeHash[N] {
  if (!testTreeForm(lead, name)) {
    throw haveHalt('form_miss', { call: name, need: 'tree' })
  }
}

export function testTree(lead: unknown): lead is TreeSite {
  return TREE_FORM.includes((lead as TreeSite).form)
}

export function haveTree(
  lead: unknown,
  call: string,
): asserts lead is TreeSite {
  if (!testTree(lead)) {
    throw haveHalt('form_miss', { call, need: 'tree' })
  }
}
