import jsQR from 'jsqr';

describe('Photo Opp Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('deve navegar por todas as telas e exibir o QR Code no final', () => {
    cy.wait(1000);
    cy.contains('Iniciar').click();

    cy.wait(100);

    cy.get('[data-testid="spinner"]').should('be.visible');

    cy.wait(2000);

    cy.get('video').should('exist');
    cy.get('button').last().click();
    cy.wait(4000);

    cy.contains('Refazer').should('exist');
    cy.contains('Continuar').click();

    cy.get('canvas').should('exist');

    cy.contains('Finalizar').click();

    cy.wait(2000);

    cy.contains('Continuar').click();

    cy.wait(2000);

    cy.contains('Obrigado!').should('exist');

    cy.get('canvas')
      .should('exist')
      .then(($canvas) => {
        const canvas = $canvas[0];
        const context = canvas.getContext('2d');
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        expect(code).to.not.be.null;
        const imageUrl = code.data;
        cy.log('QR Code decoded URL:', imageUrl);
        const req = cy.request(imageUrl);

        req.its('status').should('eq', 200);

        req.its('content-type').should('eq', 'image/jpeg');
      });

    // cy.request({
    //   url: imageUrl,
    //   encoding: 'binary',
    // }).then((response) => {
    //   expect(response.status).to.eq(200);
    //   expect(response.headers['content-type']).to.include('image');

    //   // Save to disk (optional)
    //   const filePath = path.join('cypress', 'downloads', 'image.jpg');
    //   fs.writeFileSync(filePath, response.body, 'binary');

    //   // Optionally use sharp or another Node.js image lib to validate the buffer
    // });

    cy.wait(2000);

    cy.contains('Finalizar').click();
  });
});
