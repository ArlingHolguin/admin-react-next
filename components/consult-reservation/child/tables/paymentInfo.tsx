import { Table  } from "antd";

const PaymentInfo = ({ data }) => {
  const showTable = data ? data.some(d => d.datetime != null) : false
 
  const columns = [
    {
      title: 'Código Reserva',
      dataIndex: 'code',
      key: 'code',
      render: text => <a style={{color: "#DF395D"}}>{text}</a>,
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Estado',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Mensaje',
      dataIndex: 'msg',
      key: 'msg',
    },
  ];

  const dataTable = data ? data?.map(reserve => {
    return {
      code: reserve.code_reservation,
      date: reserve.datetime,
      state: reserve.transaction_status,
      msg: reserve.message
    }
  }) : null

  return (
    <>
    {showTable && (
      <>
      <h3>Información de pagos</h3>
      <Table columns={columns} dataSource={dataTable} />
      </>
    )}
    </>
  );
};

export default PaymentInfo;
