import React from 'react';
import { Image, Table } from 'react-bootstrap';
import { Qualification } from '../../containers/doctor-profile/schema';

import styles from './qualification-listing-table.module.scss';

/* eslint-disable-next-line */
export interface QualificationListingTableProps {
  qualifications: Qualification[];
  showAddIcon: boolean;
  showEditIcon: boolean;
  tableheaderColor: boolean;
  addQualificationHandler?: () => void;
  editQualificationHandler?: (Qualification, number) => void;
  deleteQualificationHandler?: (number) => void;
}

export function QualificationListingTable({
  qualifications,
  showAddIcon,
  showEditIcon,
  addQualificationHandler,
  editQualificationHandler,
  deleteQualificationHandler,
  tableheaderColor,
}: QualificationListingTableProps) {
  return (
    <Table responsive className={`${styles.qualificationsListItems} mb-0`}>
      <thead>
        <tr>
          <th
            style={{ width: '6%' }}
            className={tableheaderColor ? styles.tableheaderColor : ''}
          >
            Qualification
          </th>
          <th
            style={{ width: '68%', paddingLeft: 10, paddingRight: 0 }}
            className={tableheaderColor ? styles.tableheaderColor : ''}
          >
            Institution
          </th>
          <th
            style={{ width: '26%', paddingLeft: 0, paddingRight: 0 }}
            className={tableheaderColor ? styles.tableheaderColor : ''}
          >
            Year Completed
          </th>
          {showAddIcon ? (
            <th style={{ width: '6%' }} className="text-right cursor-pointer">
              <span style={{ visibility: 'hidden' }}>{'addIco'}</span>
              <Image
                src="/assets/images/plus.svg"
                alt="add-icon"
                className={`${styles.addIcon}`}
                onClick={addQualificationHandler}
              />
            </th>
          ) : (
            <th style={{ width: '10%' }}>
              <span style={{ visibility: 'hidden' }}>{'addIco'}</span>
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {qualifications && qualifications.length > 0
          ? qualifications.map((qualification, index) => (
              <tr key={index}>
                <td>
                  <span className={`mr-1 ${styles.indexcolor}`}>
                    {index + 1}.{' '}
                  </span>
                  {qualification.degreeTitle}
                </td>
                <td>{qualification.institute.name}</td>
                <td>{qualification.complitionYear}</td>
                {showEditIcon && (
                  <td className="text-right">
                    <span className={`${styles.cancelIcon} ml-2`}>
                      <img
                        className={`${styles.editIcon}`}
                        src="/assets/images/trash.svg"
                        alt="Field Icon"
                        onClick={() => deleteQualificationHandler(index)}
                      />
                    </span>
                    <span
                      className={`${styles.cancelIcon} ml-2`}
                      onClick={() =>
                        editQualificationHandler(qualification, index)
                      }
                    >
                      <img
                        className={`${styles.editIcon}`}
                        src="/assets/images/edit-icon.svg"
                        alt="Field Icon"
                      />
                    </span>
                  </td>
                )}
              </tr>
            ))
          : null}
      </tbody>
    </Table>
  );
}

export default QualificationListingTable;
