import React from 'react'
import { Table } from 'semantic-ui-react'

const TableExampleCelledStriped = () => (
  <Table celled striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell colSpan='1' textAlign='center'>STORE YOUR SECRET BIP39 KEYS SECURELY</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell collapsing textAlign='left'>This will not allow duplicate words.</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing textAlign='left'>Do NOT trust sites running this page.</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing textAlign='left'>Every cryptogram is completely unique.</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing textAlign='left'>It&apos;s purpose allows backups of private bip39 keys.</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing textAlign='left'>Download and use offline only.&nbsp;&nbsp;Keep your internet disconnected.</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing textAlign='left'>Scramble and randomize bip39 words.&nbsp;&nbsp;In the proceeding grid table.</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing textAlign='left'>After the cryptogram has been created.&nbsp;&nbsp;Reveal the cipher key.&nbsp;&nbsp;Write it down.</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing textAlign='left'>Print the cryptogram only, and store in a secure place seperate from your cipher key.</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
)

export default TableExampleCelledStriped
