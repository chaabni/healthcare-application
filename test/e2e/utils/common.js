// Test timeout constants
const timeouts = {
  normal: 500,     // The normal timeout to use. For most opreations w/o a server roundtrip, this should be more than fast enough.
  slow: 1000,      // A slow timeout incase the page is doing something complex.
  molasses: 5000,  // A really really slow timeout. This should rarely be used.
  submission: 10000 // Only to be used for submission.
};

const testValues = {
  veteranFullName: {
    first: 'William',
    middle: 'John',
    last: 'Shakespeare',
    suffix: 'Jr.'
  },
  mothersMaidenName: 'Arden',
  veteranSocialSecurityNumber: '111-22-3333',
  gender: 'M',
  cityOfBirth: 'Akron',
  stateOfBirth: 'OH',
  veteranDateOfBirth: {
    month: 'Apr',
    day: '23',
    year: '1980'
  },
  maritalStatus: 'Married',

  isVaServiceConnected: '',
  compensableVaServiceConnected: '',
  receivesVaPension: '',

  isEssentialAcaCoverage: false,
  facilityState: 'IL',
  vaMedicalFacility: 'EVANSTON CBOC',
  wantsInitialVaContact: false,

  isSpanishHispanicLatino: false,
  isAmericanIndianOrAlaskanNative: false,
  isBlackOrAfricanAmerican: false,
  isNativeHawaiianOrOtherPacificIslander: false,
  isAsian: false,
  isWhite: false,

  veteranAddress: {
    street: '111 S Michigan Ave',
    city: 'Chicago',
    country: 'USA',
    state: 'IL',
    zipcode: '60603'
  },
  email: 'bills@bard.com',
  emailConfirmation: 'bills@bard.com',
  homePhone: '5551112323',
  mobilePhone: '5551114545',

  provideFinancialInfo: '',
  understandsFinancialDisclosure: '',

  spouseFullName: {
    first: 'Anne',
    middle: 'Agnes',
    last: 'Hathaway',
    suffix: 'Sr.'
  },
  spouseSocialSecurityNumber: '444-55-6666',
  spouseDateOfBirth: {
    month: 'Aug',
    day: '6',
    year: '1980'
  },
  dateOfMarriage: {
    month: 'Jun',
    day: '3',
    year: '2006'
  },

  sameAddress: '',
  cohabitedLastYear: false,
  provideSupportLastYear: false,
  spouseAddress: {
    street: '115 S Michigan Ave',
    city: 'Chicago',
    country: 'USA',
    state: 'IL',
    zipcode: '60603'
  },

  hasChildrenToReport: '',
  children: [
    {
      childFullName: {
        first: 'Hamnet',
        middle: 'Dirtbike',
        last: 'Shakespeare',
        suffix: 'Jr.'
      },
      childRelation: 'Son',
      childSocialSecurityNumber: '777-88-9999',
      childBecameDependent: {
        month: 'Feb',
        day: '2',
        year: '2012'
      },
      childDateOfBirth: {
        month: 'Feb',
        day: '2',
        year: '2012'
      },
      childDisabledBefore18: false,
      childAttendedSchoolLastYear: false,
      childEducationExpenses: '6000',
      childCohabitedLastYear: false,
      childReceivedSupportLastYear: false,
      grossIncome: '4000',
      netIncome: '3000',
      otherIncome: '2000'
    }
  ],

  veteranGrossIncome: '10000',
  veteranNetIncome: '9000',
  veteranOtherIncome: '8000',
  spouseGrossIncome: '7000',
  spouseNetIncome: '6000',
  spouseOtherIncome: '5000',

  deductibleMedicalExpenses: '1000',
  deductibleFuneralExpenses: '2000',
  deductibleEducationExpenses: '3000',

  isCoveredByHealthInsurance: '',

  providers: [
    {
      insuranceName: 'BCBS',
      insurancePolicyHolderName: 'William Shakespeare',
      insurancePolicyNumber: '100',
      insuranceGroupCode: '200'
    }
  ],

  isMedicaidEligible: '',
  isEnrolledMedicarePartA: '',
  medicarePartAEffectiveDate: {
    month: 'Apr',
    day: '23',
    year: '1980'
  },

  lastServiceBranch: 'army',
  lastEntryDate: {
    month: 'Oct',
    day: '10',
    year: '2000'
  },
  lastDischargeDate: {
    month: 'Nov',
    day: '11',
    year: '2004'
  },
  dischargeType: 'honorable',

  purpleHeartRecipient: false,
  isFormerPow: false,
  postNov111998Combat: false,
  disabledInLineOfDuty: false,
  swAsiaCombat: false,
  vietnamService: false,
  exposedToRadiation: false,
  radiumTreatments: false,
  campLejeune: false
};

function completePersonalInformation(client, data, onlyRequiredFields) {
  client
    .setValue('input[name="fname"]', data.veteranFullName.first)
    .setValue('input[name="lname"]', data.veteranFullName.last);

  if (!onlyRequiredFields) {
    client
      .setValue('input[name="mname"]', data.veteranFullName.middle)
      .setValue('select[name="suffix"]', data.veteranFullName.suffix)
      .setValue('input[name="mothersMaidenName"]', data.mothersMaidenName);
  }
}

function completeBirthInformation(client, data, onlyRequiredFields) {
  client
    .setValue('select[name="veteranBirthMonth"]', data.veteranDateOfBirth.month)
    .setValue('select[name="veteranBirthDay"]', data.veteranDateOfBirth.day)
    .setValue('input[name="veteranBirthYear"]', data.veteranDateOfBirth.year)
    .setValue('input[name="ssn"]', data.veteranSocialSecurityNumber);

  if (!onlyRequiredFields) {
    client
      .setValue('input[name="cityOfBirth"]', data.cityOfBirth)
      .setValue('select[name="stateOfBirth"]', data.stateOfBirth);
  }
}

function completeDemographicInformation(client, data, onlyRequiredFields) {
  client.setValue('select[name="gender"]', data.gender);

  if (!onlyRequiredFields) {
    client
      .click('input[name="isAmericanIndianOrAlaskanNative"] + label')
      .click('input[name="isBlackOrAfricanAmerican"] + label')
      .click('input[name="isNativeHawaiianOrOtherPacificIslander"] + label')
      .click('input[name="isAsian"] + label')
      .click('input[name="isWhite"] + label')
      .click('input[name="isSpanishHispanicLatino"] + label');
  }
}

function completeVeteranAddress(client, data, onlyRequiredFields) {
  client
    .setValue('input[name="address"]', data.veteranAddress.street)
    .setValue('input[name="city"]', data.veteranAddress.city)
    .setValue('select[name="country"]', data.veteranAddress.country)
    .setValue('select[name="state"]', data.veteranAddress.state)
    .setValue('input[name="zip"]', data.veteranAddress.zipcode);

  if (!onlyRequiredFields) {
    onlyRequiredFields;
  }
}

function completeVeteranContactInformation(client, data, onlyRequiredFields) {
  if (!onlyRequiredFields) {
    client
      .setValue('input.first-email', data.email)
      .setValue('input.second-email', data.emailConfirmation)
      .setValue('input.home-phone', data.homePhone)
      .setValue('input.mobile-phone', data.mobilePhone);
  }
}

function completeMilitaryService(client, data, onlyRequiredFields) {
  client
    .setValue('select[name="lastServiceBranch"]', data.lastServiceBranch)
    .setValue('select[name="lastEntryMonth"]', data.lastEntryDate.month)
    .setValue('select[name="lastEntryDay"]', data.lastEntryDate.day)
    .setValue('input[name="lastEntryYear"]', data.lastEntryDate.year)
    .setValue('select[name="lastDischargeMonth"]', data.lastDischargeDate.month)
    .setValue('select[name="lastDischargeDay"]', data.lastDischargeDate.day)
    .setValue('input[name="lastDischargeYear"]', data.lastDischargeDate.year)
    .setValue('select[name="dischargeType"]', data.dischargeType);

  if (!onlyRequiredFields) {
    onlyRequiredFields;
  }
}

function completeVaBenefits(client, data, onlyRequiredFields) {
  client
    .click('input[name="compensableVaServiceConnected-0"] + label')
    .click('input[name="isVaServiceConnected-0"] + label')
    .click('input[name="receivesVaPension-0"] + label');

  if (!onlyRequiredFields) {
    onlyRequiredFields;
  }
}

function completeFinancialDisclosure(client, data, onlyRequiredFields) {
  client
    .click('input[name="provideFinancialInfo-0"] + label');

  if (!onlyRequiredFields) {
    client.click('input[name="understandsFinancialDisclosure-0"] + label');
  }
}

function completeSpouseInformation(client, data, onlyRequiredFields) {
  client
    .setValue('select[name="maritalStatus"]', data.maritalStatus)
    .click('.form-panel');
  client.expect.element('input[name="fname"]').to.be.visible.before(timeouts.normal);

  client
    .setValue('input[name="fname"]', data.spouseFullName.first)
    .setValue('input[name="lname"]', data.spouseFullName.last)
    .setValue('input[name="ssn"]', data.spouseSocialSecurityNumber)
    .setValue('select[name="spouseBirthMonth"]', data.spouseDateOfBirth.month)
    .setValue('select[name="spouseBirthDay"]', data.spouseDateOfBirth.day)
    .setValue('input[name="spouseBirthYear"]', data.spouseDateOfBirth.year)
    .setValue('select[name="marriageMonth"]', data.dateOfMarriage.month)
    .setValue('select[name="marriageDay"]', data.dateOfMarriage.day)
    .setValue('input[name="marriageYear"]', data.dateOfMarriage.year)
    .click('input[name="sameAddress-1"] + label');
  client.expect.element('input[name="address"]').to.be.visible.before(timeouts.normal);

  client
    .setValue('input[name="address"]', data.spouseAddress.street)
    .setValue('input[name="city"]', data.spouseAddress.city)
    .setValue('select[name="country"]', data.spouseAddress.country)
    .setValue('select[name="state"]', data.spouseAddress.state)
    .setValue('input[name="zip"]', data.spouseAddress.zipcode);

  if (!onlyRequiredFields) {
    client
      .setValue('input[name="mname"]', 'Jacqueline')
      .setValue('select[name="suffix"]', 'Sr.')
      .click('input[name="sameAddress-1"] + label')
      .click('input[name="cohabitedLastYear-0"] + label')
      .click('input[name="provideSupportLastYear-0"] + label');
  }
}

function completeChildInformation(client, data, onlyRequiredFields) {
  client.click('input[name="hasChildrenToReport-0"] + label');
  client.expect.element('input[name="fname"]').to.be.visible.before(timeouts.normal);
  client
    .setValue('input[name="fname"]', data.children[0].childFullName.first)
    .setValue('input[name="lname"]', data.children[0].childFullName.last)
    .setValue('select[name="childRelation"]', data.children[0].childRelation)
    .setValue('input[name="ssn"]', data.children[0].childSocialSecurityNumber)
    .setValue('select[name="childBirthMonth"]', data.children[0].childDateOfBirth.month)
    .setValue('select[name="childBirthDay"]', data.children[0].childDateOfBirth.day)
    .setValue('input[name="childBirthYear"]', data.children[0].childDateOfBirth.year)
    .setValue('select[name="childBecameDependentMonth"]', data.children[0].childBecameDependent.month)
    .setValue('select[name="childBecameDependentDay"]', data.children[0].childBecameDependent.day)
    .setValue('input[name="childBecameDependentYear"]', data.children[0].childBecameDependent.year);

  if (!onlyRequiredFields) {
    client
      .setValue('input[name="mname"]', 'Dirtbike')
      .setValue('select[name="suffix"]', 'Jr.')
      .click('input[name="childDisabledBefore18"] + label')
      .click('input[name="childAttendedSchoolLastYear"] + label')
      .setValue('input[name="childEducationExpenses"]', '6000')
      .click('input[name="childCohabitedLastYear"] + label')
      .click('input[name="childReceivedSupportLastYear"] + label');
  }
}

function completeMedicareAndMedicaid(client, data, onlyRequiredFields) {
  client
    .click('input[name="isMedicaidEligible-1"] + label')
    .click('input[name="isEnrolledMedicarePartA-1"] + label');

  if (!onlyRequiredFields) {
    client
      .setValue('select[name="medicarePartAEffectiveMonth"]', data.medicarePartAEffectiveDate.month)
      .setValue('select[name="medicarePartAEffectiveDay"]', data.medicarePartAEffectiveDate.day)
      .setValue('input[name="medicarePartAEffectiveYear"]', data.medicarePartAEffectiveDate.year);
  }
}

function completeInsuranceInformation(client, data, onlyRequiredFields) {
  client.click('input[name="isCoveredByHealthInsurance-0"] + label');
  client.expect.element('input[name="insuranceName"]').to.be.visible.before(timeouts.normal);
  client
    .setValue('input[name="insuranceName"]', data.providers[0].insuranceName)
    .setValue('input[name="insurancePolicyHolderName"]', data.providers[0].insurancePolicyHolderName)
    .setValue('input[name="insurancePolicyNumber"]', data.providers[0].insurancePolicyNumber);

  if (!onlyRequiredFields) {
    client.setValue('input[name="insuranceGroupCode"]', data.providers[0].insuranceGroupCode);
  }
}

function completeVaInsuranceInformation(client, data, onlyRequiredFields) {
  client
    .setValue('select[name="state"]', data.facilityState)
    .setValue('select[name="vaMedicalFacility"]', data.vaMedicalFacility);

  if (!onlyRequiredFields) {
    client
      .click('input[name="isEssentialAcaCoverage"] + label')
      .click('input[name="wantsInitialVaContact"] + label');
  }
}

module.exports = {
  timeouts,
  testValues,
  completePersonalInformation,
  completeBirthInformation,
  completeDemographicInformation,
  completeVeteranAddress,
  completeVeteranContactInformation,
  completeMilitaryService,
  completeVaBenefits,
  completeFinancialDisclosure,
  completeSpouseInformation,
  completeChildInformation,
  completeMedicareAndMedicaid,
  completeInsuranceInformation,
  completeVaInsuranceInformation
};
