import { itemsTotalAmount } from "../totalAmount.js";

// const generateHeader = (
//   doc,
//   name,
//   detailsName,
//   address,
//   email,
//   contact,
//   address2 = "",
//   website = "",
//   charityNumber = ""
// ) => {
//   doc.image(`./others/allLogo/${name}.png`, 50, 50, { width: 60 });

//   const rightX = 50;
//   const startY = 50;

//   doc
//     .fontSize(20)
//     .fillColor("#000")
//     .text(detailsName, rightX, startY, {
//       align: "right",
//       width: 500,
//     })

//     .fontSize(13)
//     .text(address, rightX, startY + 22, {
//       align: "right",
//       width: 500,
//     })
//     .fontSize(11)
//     .text(address2, rightX, startY + 38, {
//       align: "right",
//       width: 500,
//     })

//     .fontSize(10)
//     .fillColor("#0000FF")
//     .text(`| ${website}`, rightX, startY + 53, {
//       align: "right",
//       width: 500,
//     })
//     .fillColor("#0000FF")
//     .text(`| Email: ${email} `, rightX - 97, startY + 53, {
//       align: "right",
//       width: 500,
//     })
//     .fillColor("#0000FF")
//     .text(`Ph: ${contact}`, rightX - 247, startY + 53, {
//       align: "right",
//       width: 500,
//     })

//     .fillColor("#000")
//     .text(
//       `CHARITY REGISTRATION NUMBER: ${charityNumber}`,
//       rightX,
//       startY + 67,
//       {
//         align: "right",
//         width: 500,
//       }
//     );
// };

const generateHeader = (
  doc,
  name,
  detailsName,
  address,
  email,
  contact,
  address2,
  website,
  charityNumber
  // address2 = address,
  // website = "http://localhost:8002",
  // charityNumber = "CC-21321"
) => {
  // Logo section
  doc.image(`./others/allLogo/${name}.png`, 50, 50, { width: 60 });

  const rightX = 50;
  let currentY = 50;

  // Organization Name
  doc
    .fontSize(20)
    .font("Helvetica-Bold")
    .fillColor("#2c3e50")
    .text(detailsName, rightX, currentY, {
      align: "right",
      width: 500,
    });

  currentY += 25;

  // Address section
  doc
    .fontSize(13)
    .font("Helvetica")
    .fillColor("#34495e")
    .text(address, rightX, currentY, {
      align: "right",
      width: 500,
    });

  // Conditional address line 2
  if (address2) {
    currentY += 16;
    doc.fontSize(11).text(address2, rightX, currentY, {
      align: "right",
      width: 500,
    });
  }

  // Contact information section - Horizontal layout on right side
  currentY += 16;

  doc.fontSize(10).fillColor("#2980b9").font("Helvetica");

  let contactText = `Ph: ${contact} | Email: ${email}`;

  if (website) {
    contactText += ` | ${website}`;
  }

  doc.text(contactText, rightX, currentY, {
    align: "right",
    width: 500,
  });

  currentY += 14;

  // Charity number (conditional)
  if (charityNumber) {
    doc
      .fontSize(9)
      .font("Helvetica-Bold")
      .fillColor("#7f8c8d")
      .text(`CHARITY REGISTRATION NUMBER: ${charityNumber}`, rightX, currentY, {
        align: "right",
        width: 500,
      });
    currentY += 12;
  }
};

const receiptNumber = (doc, receiptId, tId, date, time) => {
  generateHr(doc, 140);

  doc
    .fillColor("#000")
    .fontSize(10)
    .font("Helvetica")
    .text("Receipt Number:", 50, 155)
    .font("Helvetica-Bold")
    .text(receiptId, 130, 155)
    .font("Helvetica")
    .text("Transaction ID: ", 390, 155, {
      align: "left",
    })
    .font("Helvetica-Bold")
    .text(tId, 390, 155, { align: "right" })
    .font("Helvetica")
    .text("Transaction Date: ", 390, 167, {
      align: "left",
    })
    .text(date, 390, 167, { align: "right" })
    .text("Transaction Time: ", 390, 179, {
      align: "left",
    })
    .text(time, 390, 179, { align: "right" });

  generateHr(doc, 200);
};

const customerInformation = (doc, email, contactNumber) => {
  doc
    .fillColor("#000")
    .fontSize(12)
    .font("Helvetica-Bold")
    .text("Donor Information", 50, 260);

  generateHr(doc, 282);

  doc
    .fontSize(10)
    .font("Helvetica")
    .text("Email-address:", 50, 292)
    .text(`${email}`, 150, 292)
    .font("Helvetica")
    .text("Contact Number:", 50, 307)
    .text(`${contactNumber ? contactNumber : ""}`, 150, 307);

  generateHr(doc, 327);
};

const generateTable = (doc, items) => {
  doc
    .fillColor("#000")
    .fontSize(12)
    .font("Helvetica-Bold")
    .text("Donation Detail", 50, 370);
  generateHr(doc, 392);

  let i;
  const invoiceTableTop = 402;
  doc.font("Helvetica-Bold");

  generateTableRow(
    doc,
    invoiceTableTop,
    "Particulars",
    "Quantity",
    "Rate",
    "Amount"
  );
  doc.font("Helvetica");

  let position;
  for (i = 0; i < items.length; i++) {
    const item = items[i];
    position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.name,
      item.qty,
      item.qty ? `$ ${item.price / item.qty}` : `$ ${item.price}`,
      `$ ${item.price}`
    );
  }

  generateHr(doc, position + 20);

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  const totalAmount = itemsTotalAmount(items);
  doc.font("Helvetica-Bold");
  generateTableRow(doc, subtotalPosition, "", "", "Total", `$ ${totalAmount}`);
};

const generateTableRow = (doc, y, name, quantity, price, subTotal) => {
  doc
    .fontSize(10)
    .text(name, 50, y)
    .text(quantity, 200, y)
    .text(price, 350, y)
    .text(subTotal, 450, y, { width: 90, align: "right" });
};

const thankYouComponent = (doc) => {
  doc
    .fillColor("#9751A4")
    .fontSize(12)
    .font("Helvetica")
    .text("Thank you for your kind, Donation!", 50, 580, {
      align: "center",
      width: 500,
    });
};

const sponsorComponent = (doc) => {
  doc.lineJoin("round").rect(50, 630, 500, 150).fill("#14316C").stroke();
  doc
    .fillColor("#FFF")
    .fontSize(14)
    .font("Helvetica")
    .text("Sponsor’s A", 50, 700, {
      align: "center",
      width: 500,
    });
};

const footer = (doc) => {
  doc
    .fillColor("#000")
    .fontSize(9)
    .font("Helvetica")
    .text("Powered by: fund-a-charity.nz", 50, 810, {
      align: "right",
      width: 500,
    });
};

const generateHr = (doc, y) => {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
};

export {
  generateHeader,
  receiptNumber,
  customerInformation,
  generateTable,
  generateTableRow,
  generateHr,
  thankYouComponent,
  sponsorComponent,
  footer,
};
