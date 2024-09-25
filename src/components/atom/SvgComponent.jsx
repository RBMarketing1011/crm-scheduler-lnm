import { createElement } from 'react'

const renderSvgElement = (element, key) =>
{
  if (!element || typeof element !== 'object') return null

  const { type, props } = element

  // Recursively handle children if they exist
  const children = props?.children
    ? Array.isArray(props.children)
      ? props.children.map((child, index) => renderSvgElement(child, index)) // Provide a unique key for each child
      : renderSvgElement(props.children) // Single child, no need for key
    : null // No children case

  // Add the unique key prop if provided
  return createElement(type, { ...props, key }, children)
}

export const SvgComponent = ({ svgData }) =>
{
  if (!svgData || typeof svgData !== 'object') return null

  // Render the SVG with all passed props and nested elements
  return renderSvgElement(svgData)
}
