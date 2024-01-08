import LoanFields from './loan-fields';
import style from './request.module.scss';

const InstallmentPlan = () => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const fields = [
    <LoanFields type={'number'} placeholder="5000" name="january" />,
    <LoanFields type={'number'} placeholder="5000" name="february" />,
    <LoanFields type={'number'} placeholder="5000" name="march" />,
    <LoanFields type={'number'} placeholder="5000" name="april" />,
    <LoanFields type={'number'} placeholder="Nill" name="may" />,
    <LoanFields type={'number'} placeholder="5000" name="june" />,
    <LoanFields type={'number'} placeholder="Nill" name="july" />,
    <LoanFields type={'number'} placeholder="5000" name="august" />,
    <LoanFields type={'number'} placeholder="5000" name="september" />,
    <LoanFields type={'number'} placeholder="5000" name="october" />,
    <LoanFields type={'number'} placeholder="5000" name="november" />,
    <LoanFields type={'number'} placeholder="5000" name="december" />,
  ];

  return (
    <>
      <p>Installment Plan</p>
      <div className={style.table} style={{ overflow: 'auto' }}>
        <table>
          <tr>
            {loanColumns.map((items) => {
              return (
                <>
                  <th>{items.name}</th>
                </>
              );
            })}
          </tr>
          <tr>
            {months.map((item) => {
              return <td>{item}</td>;
            })}
          </tr>
          <tr>
            {fields.map((item) => {
              return <td>{item}</td>;
            })}
          </tr>
        </table>
      </div>
    </>
  );
};

export default InstallmentPlan;

export const loanColumns = [
  { key: 'jan', name: '01' },
  { key: 'feb', name: '02' },
  { key: 'mar', name: '03' },
  { key: 'apr', name: '04' },
  { key: 'may', name: '05' },
  { key: 'jun', name: '06' },
  { key: 'jul', name: '07' },
  { key: 'aug', name: '08' },
  { key: 'sep', name: '09' },
  { key: 'oct', name: '10' },
  { key: 'nov', name: '11' },
  { key: 'dec', name: '12' },
];
