import { convertFirestoreTimestampToString } from "./appHelper";
import { moneyFormat } from "./moneyFormat";

export function generateInvoiceHtmnl(invoice: Invoice, isOnMobile: boolean) {
  const date = convertFirestoreTimestampToString(invoice.created_at);

  return `
<html>
  <body>
  <style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  ${isOnMobile ? "font-size: 80%;" : ""}
  font-family: Arial, sans-serif;
}

body {
  // height: 595px;
  // width: 420px;
  // margin: auto;
  ${isOnMobile ? "padding: 3rem 4rem" : "padding: 3rem"}
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
}
table th,
table td {
  padding: 0.5rem;
  border: 1px solid #000;
  font-size: 1.2rem;
}
table th {
  text-transform: uppercase;
  background-color: #e1e1e1;
}

  </style>
      <h3>Ngày mua: ${date}</h3>
      <h3>Khách hàng: ${invoice.customer_name}</h3>
      <h3>Thanh toán: ${invoice.payment === "tien-mat" ? "Tiền mặt" : "Nợ"}</h1>
      <table>
         <thead>
            <tr>
               <th style="text-align: center;">STT</th>
               <th>Sản phẩm</th>
               <th>Đơn vị</th>
               <th>SL</th>
               <th>Giá</th>
               <th style="text-align: right;">Thành tiền</th>
            </tr>
         </thead>

         <tbody>
            ${invoice.items.reduce(
              (prev, cur, i) =>
                prev +
                `
                <tr>
                   <td style="text-align: center;">${i + 1}</td>
                   <td>${cur.product_name}</td>
                   <td>${cur.unit_name}</td>
                   <td>${cur.quantity}</td>
                   <td>${moneyFormat(cur.price)}</td>
                   <td style="text-align: right">${moneyFormat(cur.price * cur.quantity)}</td>
                </tr>
                `,
              "",
            )}

            <tr style="font-weight: 500;">
              <td colspan="5">Tổng cộng:</td>
              <td style="text-align: right; font-weight: 500;">${moneyFormat(invoice.total_price)}</td>
            </tr>
         </tbody>
      </table>
  </body>
</html>
  `;
}
