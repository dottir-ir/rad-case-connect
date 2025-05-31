
import CaseCard from './CaseCard';

const mockCases = [
  {
    id: '1',
    author: {
      name: 'Dr. Sarah Chen',
      title: 'Interventional Radiologist',
    },
    patient: {
      age: 45,
      gender: 'Female' as const,
    },
    clinicalPresentation: 'A 45-year-old female presents with acute onset of severe chest pain radiating to the back. Patient has a history of hypertension and smoking. Vital signs show elevated blood pressure and tachycardia.',
    images: ['image1', 'image2'],
    imagingFindings: 'CT angiography of the chest demonstrates a Stanford Type B aortic dissection extending from the left subclavian artery to the level of the celiac axis. The false lumen shows delayed enhancement with contrast. No evidence of branch vessel involvement.',
    differentialDiagnosis: [
      'Aortic dissection (Type A vs Type B)',
      'Pulmonary embolism',
      'Acute coronary syndrome',
      'Aortic intramural hematoma'
    ],
    finalDiagnosis: 'Stanford Type B Aortic Dissection',
    discussion: 'Aortic dissection is a life-threatening condition requiring immediate recognition and management. Type B dissections typically originate distal to the left subclavian artery and can be managed conservatively if uncomplicated. Key imaging features include the presence of an intimal flap separating true and false lumens, with the false lumen often showing delayed enhancement.',
    tags: ['Cardiovascular', 'Emergency', 'CT Angiography', 'Aortic Dissection'],
    likes: 24,
    comments: 8,
    createdAt: '2 hours ago',
    isLiked: false,
    isSaved: false,
  },
  {
    id: '2',
    author: {
      name: 'Dr. Michael Rodriguez',
      title: 'Pediatric Radiologist',
    },
    patient: {
      age: 8,
      gender: 'Male' as const,
    },
    clinicalPresentation: 'An 8-year-old boy presents with persistent cough and fever for 3 weeks, not responding to antibiotic therapy. Parents report night sweats and weight loss. No known sick contacts.',
    images: ['image1'],
    imagingFindings: 'Chest X-ray shows a large mediastinal mass with bilateral hilar lymphadenopathy. CT chest reveals a heterogeneous anterior mediastinal mass measuring 8 cm in largest dimension with areas of necrosis. No pleural effusion.',
    differentialDiagnosis: [
      'Lymphoblastic lymphoma',
      'Hodgkin lymphoma',
      'Thymoma (rare in children)',
      'Teratoma'
    ],
    finalDiagnosis: 'T-cell Lymphoblastic Lymphoma',
    discussion: 'Anterior mediastinal masses in children have a limited differential diagnosis. T-cell lymphoblastic lymphoma is the most common cause of anterior mediastinal masses in this age group. The key is to recognize the urgency of this presentation as these patients can develop superior vena cava syndrome or airway compression.',
    tags: ['Pediatric', 'Lymphoma', 'Chest X-ray', 'Mediastinal Mass'],
    likes: 18,
    comments: 12,
    createdAt: '5 hours ago',
    isLiked: true,
    isSaved: true,
  }
];

const CaseFeed = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-medical-blue mb-2">Medical Case Feed</h2>
        <p className="text-medical-gray">
          Explore and learn from real medical cases shared by verified healthcare professionals
        </p>
      </div>

      <div className="space-y-6">
        {mockCases.map((caseData) => (
          <CaseCard key={caseData.id} case={caseData} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <button className="px-6 py-2 text-medical-blue border border-medical-blue rounded-lg hover:bg-medical-blue hover:text-white transition-colors">
          Load More Cases
        </button>
      </div>
    </div>
  );
};

export default CaseFeed;
