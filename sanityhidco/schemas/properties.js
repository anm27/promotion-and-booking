export default {
  name: 'properties',
  type: 'document',
  title: 'Properties',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Property Name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'size',
      type: 'string',
      title: `Size`,
      // of: [{type: 'reference', to: [{type: 'plots'}]}],
    },
    {
      name: 'size',
      type: 'string',
      title: `Size`,
    },
  ],
}
