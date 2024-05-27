import { newSpecPage } from '@stencil/core/testing';
import { XsuchyAmbulanceList } from '../xsuchy-ambulance-list';

describe('xsuchy-ambulance-list', () => {
  it('renders transport list', async () => {
    const page = await newSpecPage({
      components: [XsuchyAmbulanceList],
      html: `<xsuchy-ambulance-list department-id="dept1" api-base="http://localhost"></xsuchy-ambulance-list>`,
    });

    // Simulovať získanie dát
    page.rootInstance.transports = [
      {
        id: '1',
        patientId: '123',
        patientName: 'John Doe',
        fromDepartmentId: 'dept1',
        toDepartmentId: 'dept2',
        scheduledDateTime: new Date().toISOString(),
        estimatedDurationMinutes: 30,
        mobilityStatus: { code: "WALK", value: "Walking", description: "" }
      }
    ];

    await page.waitForChanges();

    const listElement = page.root.shadowRoot.querySelector('md-list');
    expect(listElement).not.toBeNull();

    const listItem = listElement.querySelector('md-list-item');
    expect(listItem).not.toBeNull();
    expect(listItem.querySelector('div[slot="headline"]').textContent).toBe('John Doe');
  });
});
