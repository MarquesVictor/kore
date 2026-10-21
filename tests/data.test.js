// Os dados em src/data/ alimentam componentes e animações que assumem um formato.
// Estes testes travam esse formato: quem editar um arquivo de dados descobre na hora
// se quebrou algo (ex.: preço como texto não conta na animação).
import { describe, expect, it } from 'vitest';
import { heroStats } from '../src/data/hero.js';
import { modules } from '../src/data/modules.js';
import { operationLog } from '../src/data/operationLog.js';
import { plans } from '../src/data/plans.js';
import { steps } from '../src/data/steps.js';

const unique = (values) => new Set(values).size === values.length;

describe('hero.js', () => {
  it('cada número é inteiro (a abertura conta de 0 até ele) e o sufixo é texto', () => {
    for (const stat of heroStats) {
      expect(Number.isInteger(stat.value), stat.label).toBe(true);
      expect(typeof stat.suffix, stat.label).toBe('string');
    }
  });
});

describe('plans.js', () => {
  it('tem exatamente um plano em destaque', () => {
    expect(plans.filter((plan) => plan.featured)).toHaveLength(1);
  });

  it('preço é um inteiro positivo, sem "R$" (o PlanRow escreve o "R$" e o número conta)', () => {
    for (const plan of plans) {
      expect(Number.isInteger(plan.price) && plan.price > 0, plan.id).toBe(true);
    }
  });

  it('ids são únicos', () => {
    expect(unique(plans.map((plan) => plan.id))).toBe(true);
  });
});

describe('modules.js', () => {
  it('cada módulo usa um pilar que tem cor no CSS (module-row--{pillar})', () => {
    for (const module of modules) {
      expect(['frota', 'suprimentos', 'pessoas'], module.id).toContain(module.pillar);
    }
  });

  it('cada módulo tem 8 funcionalidades com nome e descrição', () => {
    for (const module of modules) {
      expect(module.features, module.id).toHaveLength(8);
      for (const feature of module.features) {
        expect(feature.name && feature.desc, module.id).toBeTruthy();
      }
    }
  });

  it('ids e nomes de funcionalidade são únicos (viram key no React)', () => {
    expect(unique(modules.map((module) => module.id))).toBe(true);
    for (const module of modules) {
      expect(unique(module.features.map((feature) => feature.name)), module.id).toBe(true);
    }
  });
});

describe('steps.js', () => {
  it('tem 4 passos (o CSS colore os números e a última hairline até o 4º)', () => {
    expect(steps).toHaveLength(4);
  });
});

describe('operationLog.js', () => {
  it('cada evento tem exatamente um marcador {id}', () => {
    for (const event of operationLog) {
      expect(event.text.split('{id}'), event.id).toHaveLength(2);
    }
  });
});
