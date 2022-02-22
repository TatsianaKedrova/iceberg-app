import times from 'lodash-es/times';

export class ChartsUtils {
  public static CalculateChartTicksToFitLinesCount(linesCount: number, maxValue: number): number[] {
    const minFraction = maxValue > 10
      ? Math.pow(10, Math.round(maxValue).toString().length - 2)
      : maxValue / linesCount;

    const baseTickValue = maxValue / linesCount;

    const normalizedTickValue = baseTickValue + (minFraction - baseTickValue % minFraction);

    return times(linesCount + 1).map((i) => normalizedTickValue * i);
  }
}