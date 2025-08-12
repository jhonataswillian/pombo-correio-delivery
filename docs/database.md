# Banco de Dados

## Esquema

### Pigeon (Pombo)
- id (String, PK)
- nickname (String, unique)
- photoUrl (String, optional)
- averageSpeed (Float)
- isActive (Boolean, default: true)
- createdAt (DateTime)
- updatedAt (DateTime)

### Customer (Cliente)
- id (String, PK)
- name (String)
- email (String, unique)
- birthDate (DateTime)
- address (String)
- createdAt (DateTime)
- updatedAt (DateTime)

### Letter (Carta)
- id (String, PK)
- content (String)
- recipientName (String)
- recipientAddress (String)
- status (Enum: QUEUED, SENT, DELIVERED)
- senderId (String, FK)
- pigeonId (String, FK)
- createdAt (DateTime)
- updatedAt (DateTime)
