import React from 'react';
import { Image, Table } from 'react-bootstrap';

import styles from './prescription-listing-table.module.scss';

/* eslint-disable-next-line */
export interface PrescriptionListingTableProps {
  prescriptions: any[],
  editPrescriptionHandler?: (Prescription, number) => void,
  deletePrescriptionHandler?: (string) => void,
  setSelectedPrescription: (Prescription) => void,
  setShowPrescriptionPDFModal: (visible) => void
}

export function PrescriptionListingTable(
  { prescriptions, editPrescriptionHandler, deletePrescriptionHandler, setSelectedPrescription, setShowPrescriptionPDFModal }: PrescriptionListingTableProps
) {
  return (
    <Table responsive className={`${styles.qualificationsListItems} mb-0`}>
      <thead>
        <tr>
          <th>Medication</th>
          <th>Type</th>
          <th>Dosage</th>
          <th>Frequency</th>
          <th>When ?</th>
          <th>Administration</th>
          <th>Special Instructions</th>
          <th>Refil ?</th>
          <th>File</th>
          <th>Actions</th>

        </tr>
      </thead>
      <tbody>
        {
          prescriptions && prescriptions.length > 0 ?
            prescriptions.map((prescription, index) => (
              <tr key={index}>
                <td><span className="mr-1">{index + 1}. </span>{prescription.medication}</td>
                <td>{prescription.type || '-'}</td>
                <td>{prescription.dosage || '-'}</td>
                <td>{prescription.frequency || '-'}</td>
                <td>{prescription.medicationTime || '-'}</td>
                <td>{prescription.administration || '-'}</td>
                <td>{prescription.instructions || '-'}</td>
                <td>{prescription.refil || '-'}</td>
                <td>{prescription.prescriptionFileUrl ? <a className="link" target="_blank" href={prescription.prescriptionFileUrl}>File </a> : <span className="reportLink" onClick={() => { setShowPrescriptionPDFModal(true); setSelectedPrescription(prescription) }}>Generate File</span>}</td>
                <td className="text-right">
                  <span className={`${styles.cancelIcon} ml-2`} >
                    <img className={`${styles.editIcon}`} src="/assets/images/trash.svg" alt="Field Icon" onClick={() => deletePrescriptionHandler(prescription.id)} />
                  </span>
                  <span className={`${styles.cancelIcon} ml-2`} onClick={() => editPrescriptionHandler(prescription, index)}>
                    <img className={`${styles.editIcon}`} src="/assets/images/edit-icon.svg" alt="Field Icon" />
                  </span>
                </td>
              </tr>
            ))
            : null
        }
      </tbody>
    </Table>
  );
}

export default PrescriptionListingTable;
