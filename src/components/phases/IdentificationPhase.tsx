import React, { useState } from "react";
import styled from "styled-components";
import { useGame } from "../../context/GameContext";
import { InventoryItem } from "../../types";

const IdentificationPhase: React.FC = () => {
  const { state, dispatch } = useGame();
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [identifying, setIdentifying] = useState(false);

  // Get unidentified mushrooms from inventory
  const unidentifiedItems = state.inventory.filter(
    (item) => !item.mushroom.identified
  );

  const handleSelectItem = (item: InventoryItem) => {
    setSelectedItem(item);
  };

  const handleIdentification = () => {
    if (!selectedItem) return;

    setIdentifying(true);

    // Simulate identification time
    setTimeout(() => {
      // Update the mushroom's identified status
      dispatch({
        type: "IDENTIFY_MUSHROOM",
        payload: selectedItem.mushroom,
      });

      // Reset states
      setIdentifying(false);
      setSelectedItem(null);
    }, 2000);
  };

  return (
    <Container>
      <Title>Identification</Title>

      {/* Unidentified Items List */}
      <Section>
        <SectionTitle>Unidentified Specimens</SectionTitle>
        {unidentifiedItems.length === 0 ? (
          <EmptyMessage>No unidentified mushrooms in inventory.</EmptyMessage>
        ) : (
          <ItemsGrid>
            {unidentifiedItems.map((item) => (
              <ItemCard
                key={item.id}
                isSelected={selectedItem?.id === item.id}
                onClick={() => handleSelectItem(item)}
              >
                <ItemTitle>{item.mushroom.name}</ItemTitle>
                <ItemDetails>
                  <DetailText>Quantity: {item.quantity}</DetailText>
                  <DetailText>Quality: {item.quality}%</DetailText>
                </ItemDetails>
                <ItemObservations>
                  <ObservationTitle>Notes:</ObservationTitle>
                  <ObservationList>
                    <ObservationItem>
                      Rarity: {item.mushroom.rarity}
                    </ObservationItem>
                    <ObservationItem>
                      Found in: {item.mushroom.biomes[0]}
                    </ObservationItem>
                  </ObservationList>
                  <Description>{item.mushroom.description}</Description>
                </ItemObservations>
              </ItemCard>
            ))}
          </ItemsGrid>
        )}
      </Section>

      {/* Selected Item Details */}
      {selectedItem && (
        <Section>
          <SectionTitle>Selected Specimen</SectionTitle>
          <IdentificationActions>
            <IdentifyButton
              onClick={handleIdentification}
              disabled={identifying}
            >
              {identifying ? "Identifying..." : "Identify Specimen"}
            </IdentifyButton>
          </IdentificationActions>
        </Section>
      )}

      {/* Known Mushrooms */}
      <Section>
        <SectionTitle>Identified Mushrooms</SectionTitle>
        {state.knownMushrooms.length === 0 ? (
          <EmptyMessage>No identified mushrooms yet.</EmptyMessage>
        ) : (
          <ItemsGrid>
            {state.knownMushrooms.map((mushroom) => (
              <IdentifiedCard key={mushroom.id}>
                <ItemTitle>{mushroom.name}</ItemTitle>
                <ScientificName>{mushroom.scientificName}</ScientificName>
                <ItemDetails>
                  <DetailText>Type: {mushroom.type}</DetailText>
                  <DetailText>Rarity: {mushroom.rarity}</DetailText>
                  <DetailText>Value: {mushroom.baseValue} coins</DetailText>
                </ItemDetails>
                <Description>{mushroom.description}</Description>
                <PropertiesSection>
                  <ObservationTitle>Properties:</ObservationTitle>
                  <ObservationList>
                    {mushroom.properties.map((property, index) => (
                      <ObservationItem key={index}>{property}</ObservationItem>
                    ))}
                  </ObservationList>
                </PropertiesSection>
              </IdentifiedCard>
            ))}
          </ItemsGrid>
        )}
      </Section>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  color: #fff;
  height: 100%;
  overflow-y: auto;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #fff;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: #ddd;
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 15px;
`;

const ItemCard = styled.div<{ isSelected?: boolean }>`
  background-color: ${(props) => (props.isSelected ? "#3a3a3a" : "#2a2a2a")};
  border: 1px solid ${(props) => (props.isSelected ? "#666" : "#333")};
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #3a3a3a;
    border-color: #666;
  }
`;

const IdentifiedCard = styled(ItemCard)`
  cursor: default;
  &:hover {
    background-color: #2a2a2a;
    border-color: #333;
  }
`;

const ItemTitle = styled.h4`
  font-size: 1rem;
  margin: 0 0 10px 0;
  color: #fff;
`;

const ScientificName = styled.p`
  font-style: italic;
  color: #999;
  margin: 0 0 10px 0;
  font-size: 0.9rem;
`;

const ItemDetails = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const DetailText = styled.span`
  font-size: 0.9rem;
  color: #ccc;
`;

const ItemObservations = styled.div`
  margin-top: 10px;
`;

const ObservationTitle = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  margin: 0 0 5px 0;
  color: #ddd;
`;

const ObservationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 10px 0;
`;

const ObservationItem = styled.li`
  font-size: 0.8rem;
  color: #bbb;
  margin-bottom: 3px;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #aaa;
  margin: 10px 0;
  line-height: 1.4;
`;

const PropertiesSection = styled.div`
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid #444;
`;

const EmptyMessage = styled.p`
  color: #999;
  text-align: center;
  font-style: italic;
  margin: 20px 0;
`;

const IdentificationActions = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
`;

const IdentifyButton = styled.button`
  background-color: #4a6741;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #557a4c;
  }

  &:disabled {
    background-color: #333;
    cursor: not-allowed;
  }
`;

export default IdentificationPhase;
