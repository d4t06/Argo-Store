import { moneyFormat } from "./moneyFormat";

export function generateInvoiceHtmnl(invoice: Invoice, date: string) {
  return `
<html>

  <body>
   <style>
   body {
    padding:10px;
   }
html {
  font-size: 62.5%;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
table th,
table td {
  font-size: 10px;
}
table th {
  text-transform: uppercase;
  text-align: left;
}

  </style>
      <h3>Ngày mua: ${date}</h3>
      <h3>Khách hàng: ${invoice.customer_name}</h3>
      <table cellspacing="0">
         <thead>
            <tr>
               <th>STT</th>
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
                   <td style="font-weight: bold">${i + 1}</td>
                   <td>${cur.product_name}</td>
                   <td>${cur.unit_name}</td>
                   <td>${cur.quantity}</td>
                   <td>${moneyFormat(cur.price)}</td>
                   <td style="text-align: right">${moneyFormat(cur.price * cur.quantity)}</td>
                </tr>
                `,
              "",
            )}
         </tbody>
      </table>

      <p style="text-align:right; padding-bottom:10px; margin-top:20px;">Tổng cộng: ${moneyFormat(invoice.total_price)}</p>
  </body>
 
</html>
  `;
}
